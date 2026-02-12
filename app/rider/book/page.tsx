'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, MapPin, ArrowRight, Calendar, User as UserIcon, Clock } from 'lucide-react';
import Link from 'next/link';

export default function BookRidePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('1');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const { data } = await supabase
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .order('tier');

    if (data) {
      setVehicles(data);
    }
  };

  const handleBookRide = async () => {
    if (!selectedVehicle || !pickupAddress || !dropoffAddress) return;

    setBooking(true);

    const estimatedPrice = Math.floor(Math.random() * 15000) + 5000;

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user?.id,
        pickup_address: pickupAddress,
        pickup_lat: 40.7128 + Math.random() * 0.1,
        pickup_lng: -74.0060 + Math.random() * 0.1,
        dropoff_address: dropoffAddress,
        dropoff_lat: 40.7128 + Math.random() * 0.1,
        dropoff_lng: -74.0060 + Math.random() * 0.1,
        vehicle_tier: selectedVehicle.tier,
        passenger_count: parseInt(passengerCount),
        scheduled_at: scheduledDate || null,
        is_asap: !scheduledDate,
        estimated_price_cents: estimatedPrice,
        status: 'pending',
      })
      .select()
      .single();

    if (data && !error) {
      router.push(`/rider/trips/${data.id}`);
    } else {
      setBooking(false);
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
          <h1 className="text-4xl font-light mb-2">Book a Ride</h1>
          <p className="text-black/60 font-light">Choose your vehicle and destination</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light mb-6">Trip Details</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="pickup" className="text-sm font-normal mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Pickup Location
                </Label>
                <Input
                  id="pickup"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter pickup address"
                  className="border-black/20 focus:border-black"
                />
              </div>

              <div>
                <Label htmlFor="dropoff" className="text-sm font-normal mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black/60" />
                  </div>
                  Dropoff Location
                </Label>
                <Input
                  id="dropoff"
                  value={dropoffAddress}
                  onChange={(e) => setDropoffAddress(e.target.value)}
                  placeholder="Enter destination address"
                  className="border-black/20 focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-normal mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule (optional)
                  </Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="border-black/20 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="passengers" className="text-sm font-normal mb-2 flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Passengers
                  </Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="14"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(e.target.value)}
                    className="border-black/20 focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-6">Select Vehicle</h2>

            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedVehicle?.id === vehicle.id
                      ? 'border-black ring-2 ring-black'
                      : 'border-black/10 hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/5">
                      <img
                        src={vehicle.photo_urls?.[0] || 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=200'}
                        alt={vehicle.model}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-black/40 uppercase tracking-wider mb-1">
                            {vehicle.make}
                          </p>
                          <h3 className="font-medium">{vehicle.model}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-black/40 mb-1">Starting at</p>
                          <p className="font-medium">$50</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-black/60">
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-3 h-3" />
                          {vehicle.capacity} seats
                        </span>
                        <span className="capitalize">{vehicle.tier}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <Button
            onClick={handleBookRide}
            disabled={!selectedVehicle || !pickupAddress || !dropoffAddress || booking}
            className="bg-black hover:bg-black/90 text-white rounded-full px-8 h-12"
          >
            {booking ? 'Booking...' : 'Confirm Booking'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
