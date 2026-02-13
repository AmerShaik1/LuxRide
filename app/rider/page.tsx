'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, CreditCard, User, Calendar } from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

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
      <DashboardLayout userType="rider">
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout userType="rider">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2 text-ivory font-heading">
            Welcome back{user.profile?.first_name ? `, ${user.profile.first_name}` : ''}
          </h1>
          <p className="text-ivory/60 font-light font-body">Manage your rides and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gold-400" />
              </div>
              <span className="text-2xl font-light text-ivory">{stats.totalRides}</span>
            </div>
            <p className="text-sm font-light text-ivory/60 font-body">Total Rides</p>
          </Card>

          <Card className="p-6 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gold-400" />
              </div>
              <span className="text-2xl font-light text-ivory">{stats.upcomingRides}</span>
            </div>
            <p className="text-sm font-light text-ivory/60 font-body">Upcoming</p>
          </Card>

          <Card className="p-6 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gold-400" />
              </div>
              <span className="text-2xl font-light text-ivory">${stats.totalSpent.toFixed(0)}</span>
            </div>
            <p className="text-sm font-light text-ivory/60 font-body">Total Spent</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-ivory font-heading">Recent Trips</h2>
              <Link href="/rider/trips">
                <Button variant="ghost" size="sm" className="text-ivory/60 hover:text-gold-400 font-body">
                  View all
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentRides.length === 0 ? (
                <Card className="p-12 bg-emerald-800/50 border-gold-400/20 text-center">
                  <MapPin className="w-12 h-12 text-gold-400/30 mx-auto mb-4" />
                  <p className="text-ivory/60 font-light mb-4 font-body">No rides yet</p>
                  <Link href="/rider/book">
                    <Button className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-body">
                      Book your first ride
                    </Button>
                  </Link>
                </Card>
              ) : (
                recentRides.map((ride) => (
                  <Card key={ride.id} className="p-6 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-gold-400/60" />
                          <span className="text-sm font-medium text-ivory font-body">{ride.pickup_address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-ivory/60">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
                          </div>
                          <span className="text-sm font-light font-body">{ride.dropoff_address}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-body ${
                          ride.status === 'completed' ? 'bg-emerald-700 text-gold-400' :
                          ride.status === 'pending' ? 'bg-gold-400/20 text-gold-400' :
                          'bg-emerald-800/50 text-ivory/60'
                        }`}>
                          {ride.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ivory/40 font-light font-body">
                        {new Date(ride.created_at).toLocaleDateString()}
                      </span>
                      <span className="font-medium text-gold-400 font-body">
                        ${((ride.estimated_price_cents || 0) / 100).toFixed(2)}
                      </span>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-6 text-ivory font-heading">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/rider/book">
                <Card className="p-6 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-400 group-hover:bg-gold-300 transition-colors flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-emerald-900" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-ivory font-body">Book a Ride</h3>
                      <p className="text-sm text-ivory/60 font-light font-body">Schedule or ride now</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/rider/profile">
                <Card className="p-6 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-400/10 group-hover:bg-gold-400/20 transition-colors flex items-center justify-center">
                      <User className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-ivory font-body">Profile</h3>
                      <p className="text-sm text-ivory/60 font-light font-body">Manage your account</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/rider/payment">
                <Card className="p-6 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-400/10 group-hover:bg-gold-400/20 transition-colors flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 text-ivory font-body">Payment</h3>
                      <p className="text-sm text-ivory/60 font-light font-body">Manage payment methods</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
