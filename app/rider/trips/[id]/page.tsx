'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MapPin, Navigation, Phone, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [booking, setBooking] = useState<any>(null);
  const [ride, setRide] = useState<any>(null);
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && params.id) {
      fetchTripDetails();
      const interval = setInterval(fetchTripDetails, 5000);
      return () => clearInterval(interval);
    }
  }, [user, params.id]);

  const fetchTripDetails = async () => {
    const { data: bookingData } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user?.id)
      .single();

    if (bookingData) {
      setBooking(bookingData);

      const { data: rideData } = await supabase
        .from('rides')
        .select(`
          *,
          chauffeur:chauffeurs (
            id,
            users:id (
              profiles (first_name, last_name, profile_photo_url)
            )
          ),
          vehicle:vehicles (*)
        `)
        .eq('booking_id', bookingData.id)
        .maybeSingle();

      if (rideData) {
        setRide(rideData);
        setDriver(rideData.chauffeur);
      }
    }
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
            <Link href="/rider" className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-black" />
              <span className="text-lg font-medium">APEX</span>
            </Link>
            <Link href="/rider/trips">
              <Button variant="ghost" size="sm" className="rounded-full">
                All Trips
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-light">Trip Details</h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                booking.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : booking.status === 'in_progress'
                  ? 'bg-blue-100 text-blue-700'
                  : booking.status === 'pending'
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
                    Live tracking
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

            {booking.status === 'completed' && (
              <Card className="p-6 border-black/10">
                <h2 className="text-xl font-light mb-4">Rate Your Experience</h2>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="w-10 h-10 rounded-full border border-black/20 hover:bg-black/5 flex items-center justify-center transition-colors"
                    >
                      <Star className="w-5 h-5 text-black/40" />
                    </button>
                  ))}
                </div>
                <Button className="bg-black hover:bg-black/90 text-white rounded-full">
                  Submit Rating
                </Button>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {driver && (
              <Card className="p-6 border-black/10">
                <h2 className="text-xl font-light mb-4">Your Chauffeur</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center overflow-hidden">
                    {driver.users?.profiles?.profile_photo_url ? (
                      <img
                        src={driver.users.profiles.profile_photo_url}
                        alt="Driver"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-medium">
                        {driver.users?.profiles?.first_name?.[0] || 'D'}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {driver.users?.profiles?.first_name}{' '}
                      {driver.users?.profiles?.last_name}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-black/60">
                      <Star className="w-4 h-4 fill-black text-black" />
                      <span>{driver.rating || '5.0'}</span>
                    </div>
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
            )}

            {ride?.vehicle && (
              <Card className="p-6 border-black/10">
                <h2 className="text-xl font-light mb-4">Vehicle</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-black/5 mb-4">
                  <img
                    src={
                      ride.vehicle.photo_urls?.[0] ||
                      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400'
                    }
                    alt={ride.vehicle.model}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-black/40 uppercase tracking-wider mb-1">
                  {ride.vehicle.make}
                </p>
                <p className="font-medium mb-2">{ride.vehicle.model}</p>
                <p className="text-sm text-black/60">{ride.vehicle.license_plate}</p>
              </Card>
            )}

            <Card className="p-6 border-black/10">
              <h2 className="text-xl font-light mb-4">Price Breakdown</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Base Fare</span>
                  <span>
                    ${((booking.estimated_price_cents || 0) / 100 * 0.7).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Distance</span>
                  <span>
                    ${((booking.estimated_price_cents || 0) / 100 * 0.3).toFixed(2)}
                  </span>
                </div>
                <div className="pt-3 border-t border-black/10 flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      (booking.final_price_cents || booking.estimated_price_cents || 0) / 100
                    ).toFixed(2)}
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
