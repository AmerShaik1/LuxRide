'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, User, Save } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .maybeSingle();

    if (data) {
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');
    }

    const { data: userData } = await supabase
      .from('users')
      .select('phone')
      .eq('id', user?.id)
      .maybeSingle();

    if (userData) {
      setPhone(userData.phone || '');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toISOString(),
      });

    const { error: userError } = await supabase
      .from('users')
      .update({ phone })
      .eq('id', user?.id);

    if (!profileError && !userError) {
      setSuccess(true);
      await refreshUser();
      setTimeout(() => setSuccess(false), 3000);
    }

    setSaving(false);
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

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">Profile</h1>
          <p className="text-black/60 font-light">Manage your account information</p>
        </div>

        <Card className="p-8 border-black/10">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center">
              <User className="w-12 h-12 text-black/40" />
            </div>
          </div>

          {success && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600 text-center">
              Profile updated successfully
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-normal">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1.5 border-black/20 focus:border-black"
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-normal">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1.5 border-black/20 focus:border-black"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-normal">
                Email
              </Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="mt-1.5 border-black/20 bg-black/5"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-normal">
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 border-black/20 focus:border-black"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-black hover:bg-black/90 text-white rounded-full h-11"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
