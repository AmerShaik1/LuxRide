'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<'rider' | 'chauffeur'>('rider');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signUp(email, password, {
      full_name: fullName,
      phone,
      user_type: userType,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-emerald-deep flex items-center justify-center px-8">
        <Card className="w-full max-w-md bg-emerald-dark/50 border-2 border-champagne/20 shadow-none">
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-champagne flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-champagne" />
            </div>
            <h2 className="text-3xl font-light mb-3 text-champagne font-heading">Account created!</h2>
            <p className="text-sm text-ivory/85 font-light font-body">
              Redirecting to sign in...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-deep flex flex-col">
      <nav className="border-b border-champagne/20 py-6 px-8">
        <Link href="/" className="flex items-center gap-3 text-ivory hover:text-champagne transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-light tracking-wide font-body">BACK</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <Card className="w-full max-w-md bg-emerald-dark/50 border-2 border-champagne/20 shadow-none">
          <div className="p-10">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-7 h-7 text-champagne" />
                <span className="text-2xl font-light tracking-[0.2em] text-ivory font-heading">APEX</span>
              </div>
            </div>

            <h1 className="text-4xl font-light text-center mb-3 font-heading text-ivory">Join APEX</h1>
            <p className="text-sm text-ivory/85 text-center mb-10 font-light font-body">
              Create your account
            </p>

            {error && (
              <div className="mb-6 p-4 bg-champagne/10 border border-champagne/30 text-sm text-champagne font-body">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="userType" className="text-sm font-light text-champagne mb-3 block font-body">
                  I want to
                </Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as 'rider' | 'chauffeur')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="rider" id="rider" />
                    <Label htmlFor="rider" className="font-light cursor-pointer text-ivory/95 font-body">Book rides</Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="chauffeur" id="chauffeur" />
                    <Label htmlFor="chauffeur" className="font-light cursor-pointer text-ivory/95 font-body">Drive</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="fullName" className="text-sm font-light text-champagne font-body">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-light text-champagne font-body">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-light text-champagne font-body">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-light text-champagne font-body">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-champagne hover:bg-champagne-light text-black font-light tracking-wide h-12 mt-8 font-body"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-ivory/85 font-light font-body">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-champagne font-light hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
