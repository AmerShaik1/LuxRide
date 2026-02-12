'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, DollarSign, MapPin, Clock, User, LogOut, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function DriverDashboard() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [stats, setStats] = useState({
    todayEarnings: 0,
    totalRides: 0,
    rating: 5.0,
    acceptanceRate: 100,
  });
  const [availableRides, setAvailableRides] = useState<any[]>([]);
  const [activeRide, setActiveRide] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchDriverStats();
      fetchAvailableRides();
      fetchActiveRide();

      const interval = setInterval(() => {
        fetchAvailableRides();
        fetchActiveRide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchDriverStats = async () => {
    const { data: chauffeur } = await supabase
      .from('chauffeurs')
      .select('rating, total_rides, acceptance_rate, is_online')
      .eq('id', user?.id)
      .maybeSingle();

    if (chauffeur) {
      setIsOnline(chauffeur.is_online || false);
      setStats((prev) => ({
        ...prev,
        rating: chauffeur.rating || 5.0,
        totalRides: chauffeur.total_rides || 0,
        acceptanceRate: chauffeur.acceptance_rate || 100,
      }));
    }

    const today = new Date().toISOString().split('T')[0];
    const { data: earnings } = await supabase
      .from('earnings')
      .select('net_amount')
      .eq('driver_id', user?.id)
      .gte('created_at', today);

    if (earnings) {
      const todayTotal = earnings.reduce((sum, e) => sum + parseFloat(e.net_amount || '0'), 0);
      setStats((prev) => ({ ...prev, todayEarnings: todayTotal }));
    }
  };

  const fetchAvailableRides = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setAvailableRides(data);
    }
  };

  const fetchActiveRide = async () => {
    const { data } = await supabase
      .from('rides')
      .select(`
        *,
        booking:bookings (*)
      `)
      .eq('chauffeur_id', user?.id)
      .in('booking.status', ['assigned', 'accepted', 'in_progress'])
      .maybeSingle();

    if (data) {
      setActiveRide(data);
    }
  };

  const toggleOnlineStatus = async () => {
    const newStatus = !isOnline;
    await supabase
      .from('chauffeurs')
      .update({ is_online: newStatus })
      .eq('id', user?.id);

    setIsOnline(newStatus);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
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
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-black" />
                <span className="text-lg font-medium">APEX Driver</span>
              </Link>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <Link href="/driver" className="text-black font-medium">Dashboard</Link>
                <Link href="/driver/rides" className="text-black/60 hover:text-black">Rides</Link>
                <Link href="/driver/earnings" className="text-black/60 hover:text-black">Earnings</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-black/60">{isOnline ? 'Online' : 'Offline'}</span>
                <button
                  onClick={toggleOnlineStatus}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    isOnline ? 'bg-green-500' : 'bg-black/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      isOnline ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="rounded-full"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">
            Welcome back{user?.profile?.first_name ? `, ${user.profile.first_name}` : ''}
          </h1>
          <p className="text-black/60 font-light">
            {isOnline ? 'You are online and ready to accept rides' : 'Go online to start accepting rides'}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-light">${stats.todayEarnings.toFixed(0)}</span>
            </div>
            <p className="text-sm font-light text-black/60">Today's Earnings</p>
          </Card>

          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-light">{stats.totalRides}</span>
            </div>
            <p className="text-sm font-light text-black/60">Total Rides</p>
          </Card>

          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-light">{stats.rating.toFixed(1)}</span>
            </div>
            <p className="text-sm font-light text-black/60">Rating</p>
          </Card>

          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-light">{stats.acceptanceRate.toFixed(0)}%</span>
            </div>
            <p className="text-sm font-light text-black/60">Acceptance Rate</p>
          </Card>
        </div>

        {activeRide && (
          <Card className="p-8 border-black mb-8 bg-black text-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">Active Ride</h2>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/20">
                {activeRide.booking?.status}
              </span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-sm text-white/60 mb-1">Pickup</p>
                  <p className="font-medium">{activeRide.booking?.pickup_address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Dropoff</p>
                  <p className="font-medium">{activeRide.booking?.dropoff_address}</p>
                </div>
              </div>
            </div>
            <Link href={`/driver/rides/${activeRide.booking?.id}`}>
              <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full h-11">
                View Ride Details
              </Button>
            </Link>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light">Available Rides</h2>
            {!isOnline && (
              <p className="text-sm text-black/40">Go online to see available rides</p>
            )}
          </div>

          {!isOnline ? (
            <Card className="p-12 border-black/10 text-center">
              <MapPin className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <p className="text-black/60 font-light mb-4">You are currently offline</p>
              <Button
                onClick={toggleOnlineStatus}
                className="bg-black hover:bg-black/90 text-white rounded-full"
              >
                Go Online
              </Button>
            </Card>
          ) : availableRides.length === 0 ? (
            <Card className="p-12 border-black/10 text-center">
              <Clock className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <p className="text-black/60 font-light">No available rides at the moment</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {availableRides.map((ride) => (
                <Link key={ride.id} href={`/driver/dispatch/${ride.id}`}>
                  <Card className="p-6 border-black/10 hover:border-black/20 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-black/40" />
                          <span className="text-sm font-medium">{ride.pickup_address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-black/60 mb-3">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                          </div>
                          <span className="text-sm font-light">{ride.dropoff_address}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-black/40">
                          <span>{ride.estimated_distance_miles?.toFixed(1) || '5.0'} mi</span>
                          <span>{ride.estimated_duration_minutes || '15'} min</span>
                          <span className="capitalize">{ride.vehicle_tier}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-medium mb-1">
                          ${((ride.estimated_price_cents || 0) / 100).toFixed(2)}
                        </p>
                        <p className="text-xs text-black/40">Estimated</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
