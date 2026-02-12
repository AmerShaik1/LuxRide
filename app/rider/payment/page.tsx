'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, CreditCard, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchPaymentMethods = async () => {
    const { data } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', user?.id)
      .order('is_default', { ascending: false });

    if (data) {
      setPaymentMethods(data);
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

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-2">Payment Methods</h1>
          <p className="text-black/60 font-light">Manage your payment options</p>
        </div>

        <div className="space-y-4 mb-6">
          {paymentMethods.length === 0 ? (
            <Card className="p-12 border-black/10 text-center">
              <CreditCard className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <p className="text-black/60 font-light mb-4">No payment methods added</p>
              <Button className="bg-black hover:bg-black/90 text-white rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </Card>
          ) : (
            paymentMethods.map((method) => (
              <Card
                key={method.id}
                className="p-6 border-black/10 hover:border-black/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {method.brand} •••• {method.last4}
                      </p>
                      <p className="text-sm text-black/60 font-light">
                        Expires {method.exp_month}/{method.exp_year}
                      </p>
                    </div>
                  </div>
                  {method.is_default && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black text-white">
                      Default
                    </span>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {paymentMethods.length > 0 && (
          <Button className="w-full bg-black/5 hover:bg-black/10 text-black border border-black/20 rounded-full h-11">
            <Plus className="w-4 h-4 mr-2" />
            Add New Payment Method
          </Button>
        )}
      </main>
    </div>
  );
}
