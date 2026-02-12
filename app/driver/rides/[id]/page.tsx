'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MapPin, Navigation, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function DriverRideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [booking, setBooking] = useState<any>(null);
  const [ride, setRide] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && params.id) {
      fetchRideDetails();
      const interval = setInterval(fetchRideDetails, 5000);
      return () => clearInterval(interval);
    }
  }, [user, params.id]);

  const fetchRideDetails = async () => {
    const { data: bookingData } = await supabase
      .from('bookings')
      .select(`
        *,
        user:users (
          profiles (first_name, last_name, profile_photo_url, phone)
        )
      `)
      .eq('id', params.id)
      .single();

    if (bookingData) {
      setBooking(bookingData);

      const { data: rideData } = await supabase
        .from('rides')
        .select('*')
        .eq('booking_id', bookingData.id)
        .maybeSingle();

      if (rideData) {
        setRide(rideData);
      }
    }
  };

  const updateRideStatus = async (status: string, rideUpdate?: any) => {
    await supabase
      .from('bookings')
      .update({ status })
      .eq('id', booking.id);

    if (ride && rideUpdate) {
      await supabase
        .from('rides')
        .update(rideUpdate)
        .eq('id', ride.id);
    }

    await fetchRideDetails();
  };

  if (loading || !booking) {
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
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-light">Active Ride</h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                booking.status === 'in_progress'
                  ? 'bg-blue-100 text-blue-700'
                  : booking.status === 'assigned'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-black/5 text-black/60'
              }`}
            >
              {booking.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-black/10">
              <div className="aspect-video bg-black/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="w-12 h-12 text-black/20" />
                  <p className="absolute bottom-4 left-4 text-sm text-black/60 font-light">
                    Navigation
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-6">Route</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-black/40 font-light mb-1">Pickup</p>
                    <p className="font-medium">{booking.pickup_address}</p>
                  </div>
                </div>
                <div className="ml-4 border-l-2 border-dashed border-black/10 h-8" />
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-black/60" />
                  </div>
                  <div>
                    <p className="text-sm text-black/40 font-light mb-1">Dropoff</p>
                    <p className="font-medium">{booking.dropoff_address}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-4">Trip Actions</h2>
              <div className="space-y-3">
                {booking.status === 'assigned' && (
                  <Button
                    onClick={() => updateRideStatus('accepted', { accepted_at: new Date().toISOString() })}
                    className="w-full bg-black hover:bg-black/90 text-white rounded-full h-11"
                  >
                    Confirm Pickup
                  </Button>
                )}
                {booking.status === 'accepted' && (
                  <Button
                    onClick={() => updateRideStatus('in_progress', { started_at: new Date().toISOString() })}
                    className="w-full bg-black hover:bg-black/90 text-white rounded-full h-11"
                  >
                    Start Trip
                  </Button>
                )}
                {booking.status === 'in_progress' && (
                  <Button
                    onClick={() => updateRideStatus('completed', { ended_at: new Date().toISOString() })}
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full h-11"
                  >
                    Complete Trip
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-4">Passenger</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center overflow-hidden">
                  {booking.user?.profiles?.profile_photo_url ? (
                    <img
                      src={booking.user.profiles.profile_photo_url}
                      alt="Passenger"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-medium">
                      {booking.user?.profiles?.first_name?.[0] || 'P'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {booking.user?.profiles?.first_name}{' '}
                    {booking.user?.profiles?.last_name}
                  </p>
                  <p className="text-sm text-black/60">{booking.passenger_count} passenger(s)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 border-black/20 rounded-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1 border-black/20 rounded-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-4">Earnings</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Trip Fare</span>
                  <span>${((booking.estimated_price_cents || 0) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Commission (20%)</span>
                  <span className="text-red-600">
                    -${((booking.estimated_price_cents || 0) / 100 * 0.2).toFixed(2)}
                  </span>
                </div>
                <div className="pt-3 border-t border-black/10 flex justify-between font-medium">
                  <span>Your Earnings</span>
                  <span className="text-green-600">
                    ${((booking.estimated_price_cents || 0) / 100 * 0.8).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
