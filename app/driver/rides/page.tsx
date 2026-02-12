'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function DriverRidesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [rides, setRides] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'cancelled'>('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchRides();
    }
  }, [user, filter]);

  const fetchRides = async () => {
    let query = supabase
      .from('rides')
      .select(`
        *,
        booking:bookings (*)
      `)
      .eq('chauffeur_id', user?.id)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('booking.status', filter);
    }

    const { data } = await query;

    if (data) {
      setRides(data);
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
          <h1 className="text-4xl font-light mb-2">Ride History</h1>
          <p className="text-black/60 font-light">View all your completed and active rides</p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          {(['all', 'completed', 'in_progress', 'cancelled'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? 'bg-black text-white rounded-full'
                  : 'border-black/20 rounded-full hover:bg-black/5'
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {rides.length === 0 ? (
            <Card className="p-12 border-black/10 text-center">
              <MapPin className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <p className="text-black/60 font-light">No rides found</p>
            </Card>
          ) : (
            rides.map((ride) => (
              <Link key={ride.id} href={`/driver/rides/${ride.booking?.id}`}>
                <Card className="p-6 border-black/10 hover:border-black/20 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-black/40" />
                        <span className="text-sm font-medium">{ride.booking?.pickup_address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-black/60 mb-3">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                        </div>
                        <span className="text-sm font-light">{ride.booking?.dropoff_address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-black/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(ride.created_at).toLocaleDateString()}
                        </span>
                        <span>{new Date(ride.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                          ride.booking?.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : ride.booking?.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-700'
                            : ride.booking?.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {ride.booking?.status.replace('_', ' ')}
                      </span>
                      <p className="text-lg font-medium">
                        ${((ride.booking?.estimated_price_cents || 0) / 100 * 0.8).toFixed(2)}
                      </p>
                      <p className="text-xs text-black/40">Your earnings</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
