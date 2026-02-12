'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import Link from 'next/link';

export default function EarningsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'all'>('week');
  const [earnings, setEarnings] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    rides: 0,
    commission: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchEarnings();
    }
  }, [user, period]);

  const fetchEarnings = async () => {
    let startDate = new Date();
    if (period === 'today') {
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      startDate = new Date(0);
    }

    const { data } = await supabase
      .from('earnings')
      .select(`
        *,
        ride:rides (
          booking:bookings (
            pickup_address,
            dropoff_address
          )
        )
      `)
      .eq('driver_id', user?.id)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (data) {
      setEarnings(data);

      const total = data.reduce((sum, e) => sum + parseFloat(e.net_amount || '0'), 0);
      const commission = data.reduce((sum, e) => sum + parseFloat(e.commission || '0'), 0);

      setSummary({
        total,
        rides: data.length,
        commission,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse">
          <Shield className="w-12 h-12 text-black" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-black/5 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/driver" className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-black" />
              <span className="text-lg font-medium">APEX Driver</span>
            </Link>
            <Link href="/driver">
              <Button variant="ghost" size="sm" className="rounded-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">Earnings</h1>
          <p className="text-black/60 font-light">Track your income and ride history</p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          {(['today', 'week', 'month', 'all'] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
              className={
                period === p
                  ? 'bg-black text-white rounded-full'
                  : 'border-black/20 rounded-full hover:bg-black/5'
              }
            >
              {p === 'today' ? 'Today' : p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time'}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-3xl font-light">${summary.total.toFixed(2)}</span>
            </div>
            <p className="text-sm font-light text-black/60">Total Earnings</p>
          </Card>

          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-black" />
              </div>
              <span className="text-3xl font-light">{summary.rides}</span>
            </div>
            <p className="text-sm font-light text-black/60">Completed Rides</p>
          </Card>

          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <span className="text-3xl font-light">
                ${summary.rides > 0 ? (summary.total / summary.rides).toFixed(2) : '0.00'}
              </span>
            </div>
            <p className="text-sm font-light text-black/60">Avg per Ride</p>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light">Earnings History</h2>
            <Button variant="outline" className="border-black/20 rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="space-y-4">
            {earnings.length === 0 ? (
              <Card className="p-12 border-black/10 text-center">
                <DollarSign className="w-12 h-12 text-black/20 mx-auto mb-4" />
                <p className="text-black/60 font-light">No earnings in this period</p>
              </Card>
            ) : (
              earnings.map((earning) => (
                <Card key={earning.id} className="p-6 border-black/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        {earning.ride?.booking?.pickup_address || 'Ride'} → {earning.ride?.booking?.dropoff_address || 'Destination'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-black/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(earning.created_at).toLocaleDateString()}
                        </span>
                        <span>{new Date(earning.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-medium text-green-600 mb-1">
                        ${parseFloat(earning.net_amount || '0').toFixed(2)}
                      </p>
                      <p className="text-xs text-black/40">
                        Commission: ${parseFloat(earning.commission || '0').toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
