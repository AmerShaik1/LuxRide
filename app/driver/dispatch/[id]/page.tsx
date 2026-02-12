'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MapPin, Navigation, User, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function DispatchPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [booking, setBooking] = useState<any>(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && params.id) {
      fetchBooking();
    }
  }, [user, params.id]);

  const fetchBooking = async () => {
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        user:users (
          profiles (first_name, last_name, profile_photo_url)
        )
      `)
      .eq('id', params.id)
      .single();

    if (data) {
      setBooking(data);
    }
  };

  const handleAccept = async () => {
    setAccepting(true);

    const { data: ride, error } = await supabase
      .from('rides')
      .insert({
        booking_id: booking.id,
        chauffeur_id: user?.id,
        vehicle_id: null,
        assigned_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!error && ride) {
      await supabase
        .from('bookings')
        .update({ status: 'assigned' })
        .eq('id', booking.id);

      router.push(`/driver/rides/${booking.id}`);
    } else {
      setAccepting(false);
    }
  };

  const handleDecline = () => {
    router.push('/driver');
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
            <Link href="/driver">
              <Button variant="ghost" size="sm" className="rounded-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">New Ride Request</h1>
          <p className="text-black/60 font-light">Review and accept this ride</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-black/10">
              <div className="aspect-video bg-black/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="w-12 h-12 text-black/20" />
                </div>
                <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-sm">
                  <p className="text-sm font-medium">
                    {booking.estimated_distance_miles?.toFixed(1) || '5.0'} mi
                  </p>
                  <p className="text-xs text-black/60">
                    {booking.estimated_duration_minutes || '15'} min
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-6">Route Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-black/40 font-light mb-1">Pickup</p>
                    <p className="font-medium">{booking.pickup_address}</p>
                    {booking.pickup_notes && (
                      <p className="text-sm text-black/60 mt-1">{booking.pickup_notes}</p>
                    )}
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
                    {booking.dropoff_notes && (
                      <p className="text-sm text-black/60 mt-1">{booking.dropoff_notes}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-4">Passenger</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center overflow-hidden">
                  {booking.user?.profiles?.profile_photo_url ? (
                    <img
                      src={booking.user.profiles.profile_photo_url}
                      alt="Passenger"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-black/40" />
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
              {booking.special_requests && (
                <div className="pt-4 border-t border-black/5">
                  <p className="text-sm text-black/60 font-light mb-1">Special Requests</p>
                  <p className="text-sm">{booking.special_requests}</p>
                </div>
              )}
            </Card>

            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-4">Earnings</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Base Fare</span>
                  <span>${((booking.estimated_price_cents || 0) / 100 * 0.7).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Distance</span>
                  <span>${((booking.estimated_price_cents || 0) / 100 * 0.3).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Commission (20%)</span>
                  <span className="text-red-600">
                    -${((booking.estimated_price_cents || 0) / 100 * 0.2).toFixed(2)}
                  </span>
                </div>
                <div className="pt-3 border-t border-black/10 flex justify-between font-medium text-lg">
                  <span>Your Earnings</span>
                  <span className="text-green-600">
                    ${((booking.estimated_price_cents || 0) / 100 * 0.8).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleAccept}
                disabled={accepting}
                className="w-full bg-black hover:bg-black/90 text-white rounded-full h-12"
              >
                <Check className="w-4 h-4 mr-2" />
                {accepting ? 'Accepting...' : 'Accept Ride'}
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="w-full border-black/20 rounded-full h-12"
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
