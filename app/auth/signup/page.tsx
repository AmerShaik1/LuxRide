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
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <Card className="w-full max-w-md border-black/10 shadow-none">
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-light mb-2">Account created!</h2>
            <p className="text-sm text-black/60 font-light">
              Redirecting to sign in...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-black/5 py-4 px-6">
        <Link href="/" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-light">Back</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md border-black/10 shadow-none">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-black" />
                <span className="text-xl font-medium">APEX</span>
              </div>
            </div>

            <h1 className="text-3xl font-light text-center mb-2">Join APEX</h1>
            <p className="text-sm text-black/60 text-center mb-8 font-light">
              Create your account
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="userType" className="text-sm font-normal mb-3 block">
                  I want to
                </Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as 'rider' | 'chauffeur')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="rider" id="rider" />
                    <Label htmlFor="rider" className="font-light cursor-pointer">Book rides</Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="chauffeur" id="chauffeur" />
                    <Label htmlFor="chauffeur" className="font-light cursor-pointer">Drive</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="fullName" className="text-sm font-normal">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 border-black/20 focus:border-black"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-normal">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 border-black/20 focus:border-black"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-normal">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 border-black/20 focus:border-black"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-normal">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 border-black/20 focus:border-black"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-black/90 text-white font-normal rounded-full h-11 mt-6"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-black/60 font-light">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-black font-normal hover:underline">
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
