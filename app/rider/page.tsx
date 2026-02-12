'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MapPin, Clock, CreditCard, User, LogOut, Calendar, Star } from 'lucide-react';
import Link from 'next/link';

export default function RiderDashboard() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [recentRides, setRecentRides] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRides: 0,
    upcomingRides: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchRecentRides();
      fetchStats();
    }
  }, [user]);

  const fetchRecentRides = async () => {
    const { data } = await supabase
      .from('bookings')
      .select(`
        id,
        pickup_address,
        dropoff_address,
        scheduled_at,
        status,
        estimated_price_cents,
        vehicle_tier,
        created_at
      `)
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) {
      setRecentRides(data);
    }
  };

  const fetchStats = async () => {
    const { data: bookings } = await supabase
      .from('bookings')
      .select('status, estimated_price_cents')
      .eq('user_id', user?.id);

    if (bookings) {
      const completed = bookings.filter(b => b.status === 'completed').length;
      const upcoming = bookings.filter(b => b.status === 'pending' || b.status === 'assigned').length;
      const totalSpent = bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + (b.estimated_price_cents || 0), 0) / 100;

      setStats({
        totalRides: completed,
        upcomingRides: upcoming,
        totalSpent,
      });
    }
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-black/5 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-black" />
                <span className="text-lg font-medium">APEX</span>
              </Link>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <Link href="/rider" className="text-black font-medium">Dashboard</Link>
                <Link href="/rider/book" className="text-black/60 hover:text-black">Book</Link>
                <Link href="/rider/trips" className="text-black/60 hover:text-black">Trips</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/rider/profile">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
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
            Welcome back{user.profile?.first_name ? `, ${user.profile.first_name}` : ''}
          </h1>
          <p className="text-black/60 font-light">Manage your rides and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                <Clock className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-light">{stats.upcomingRides}</span>
            </div>
            <p className="text-sm font-light text-black/60">Upcoming</p>
          </Card>

          <Card className="p-6 border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-light">${stats.totalSpent.toFixed(0)}</span>
            </div>
            <p className="text-sm font-light text-black/60">Total Spent</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">Recent Trips</h2>
              <Link href="/rider/trips">
                <Button variant="ghost" size="sm" className="text-black/60">
                  View all
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentRides.length === 0 ? (
                <Card className="p-12 border-black/10 text-center">
                  <MapPin className="w-12 h-12 text-black/20 mx-auto mb-4" />
                  <p className="text-black/60 font-light mb-4">No rides yet</p>
                  <Link href="/rider/book">
                    <Button className="bg-black hover:bg-black/90 text-white rounded-full">
                      Book your first ride
                    </Button>
                  </Link>
                </Card>
              ) : (
                recentRides.map((ride) => (
                  <Card key={ride.id} className="p-6 border-black/10 hover:border-black/20 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-black/40" />
                          <span className="text-sm font-medium">{ride.pickup_address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-black/60">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                          </div>
                          <span className="text-sm font-light">{ride.dropoff_address}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          ride.status === 'completed' ? 'bg-green-100 text-green-700' :
                          ride.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-black/5 text-black/60'
                        }`}>
                          {ride.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/40 font-light">
                        {new Date(ride.created_at).toLocaleDateString()}
                      </span>
                      <span className="font-medium">
                        ${((ride.estimated_price_cents || 0) / 100).toFixed(2)}
                      </span>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/rider/book">
                <Card className="p-6 border-black/10 hover:border-black/20 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black group-hover:bg-black/90 transition-colors flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Book a Ride</h3>
                      <p className="text-sm text-black/60 font-light">Schedule or ride now</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/rider/profile">
                <Card className="p-6 border-black/10 hover:border-black/20 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <User className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Profile</h3>
                      <p className="text-sm text-black/60 font-light">Manage your account</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/rider/payment">
                <Card className="p-6 border-black/10 hover:border-black/20 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Payment</h3>
                      <p className="text-sm text-black/60 font-light">Manage payment methods</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
