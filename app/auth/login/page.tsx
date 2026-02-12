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

            <h1 className="text-4xl font-light text-center mb-3 font-heading text-ivory">Welcome back</h1>
            <p className="text-sm text-ivory/85 text-center mb-10 font-light font-body">
              Sign in to your account
            </p>

            {error && (
              <div className="mb-6 p-4 bg-champagne/10 border border-champagne/30 text-sm text-champagne font-body">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <Label htmlFor="password" className="text-sm font-light text-champagne font-body">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-emerald-deep border-champagne/30 text-ivory focus:border-champagne"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-champagne hover:bg-champagne-light text-black font-light tracking-wide h-12 mt-8 font-body"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-ivory/85 font-light font-body">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-champagne font-light hover:underline">
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
