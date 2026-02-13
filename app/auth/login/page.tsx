'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

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

            <h1 className="text-3xl font-light text-center mb-2">Welcome back</h1>
            <p className="text-sm text-black/60 text-center mb-8 font-light">
              Sign in to your account
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="password" className="text-sm font-normal">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 border-black/20 focus:border-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-black/90 text-white font-normal rounded-full h-11 mt-6"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-black/60 font-light">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-black font-normal hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
