'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MapPin, Calendar, Download } from 'lucide-react';
import Link from 'next/link';

export default function TripsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user, filter]);

  const fetchTrips = async () => {
    let query = supabase
      .from('bookings')
      .select(`
        id,
        pickup_address,
        dropoff_address,
        scheduled_at,
        status,
        estimated_price_cents,
        final_price_cents,
        vehicle_tier,
        created_at
      `)
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;

    if (data) {
      setTrips(data);
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
            <Link href="/rider" className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-black" />
              <span className="text-lg font-medium">APEX</span>
            </Link>
            <Link href="/rider">
              <Button variant="ghost" size="sm" className="rounded-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">Trip History</h1>
          <p className="text-black/60 font-light">View all your rides and receipts</p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          {(['all', 'completed', 'pending', 'cancelled'] as const).map((f) => (
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
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {trips.length === 0 ? (
            <Card className="p-12 border-black/10 text-center">
              <MapPin className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <p className="text-black/60 font-light mb-4">No trips found</p>
              <Link href="/rider/book">
                <Button className="bg-black hover:bg-black/90 text-white rounded-full">
                  Book a ride
                </Button>
              </Link>
            </Card>
          ) : (
            trips.map((trip) => (
              <Link key={trip.id} href={`/rider/trips/${trip.id}`}>
                <Card className="p-6 border-black/10 hover:border-black/20 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-black/40" />
                        <span className="text-sm font-medium">{trip.pickup_address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-black/60 mb-3">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                        </div>
                        <span className="text-sm font-light">{trip.dropoff_address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-black/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(trip.created_at).toLocaleDateString()}
                        </span>
                        <span className="capitalize">{trip.vehicle_tier}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                          trip.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : trip.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : trip.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-black/5 text-black/60'
                        }`}
                      >
                        {trip.status}
                      </span>
                      <p className="text-lg font-medium">
                        $
                        {(
                          (trip.final_price_cents || trip.estimated_price_cents || 0) / 100
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {trip.status === 'completed' && (
                    <div className="pt-4 border-t border-black/5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-black/60 hover:text-black"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  )}
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
