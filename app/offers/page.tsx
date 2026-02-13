'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Percent, Gift, Calendar, Star, Clock } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function OffersPage() {
  const offers = [
    {
      icon: Percent,
      badge: 'Limited Time',
      title: 'First Ride Privilege',
      discount: '25% OFF',
      description: 'Experience Aurello luxury with an exclusive discount on your inaugural journey',
      terms: 'Valid for new members only. Maximum discount $100. Valid until end of month.',
      validUntil: 'December 31, 2024',
    },
    {
      icon: Gift,
      badge: 'New',
      title: 'Referral Program',
      discount: '$50 Credit',
      description: 'Refer a distinguished guest and both receive $50 credit upon their first journey',
      terms: 'No limit on referrals. Credit applied after friend\'s first completed ride.',
      validUntil: 'Ongoing',
    },
    {
      icon: Calendar,
      badge: 'Exclusive',
      title: 'Monthly Membership',
      discount: '30% OFF',
      description: 'Unlimited journeys with 30% discount. Ideal for frequent travelers',
      terms: 'Minimum 10 rides per month. Premium vehicles included. Annual commitment.',
      validUntil: 'Limited availability',
    },
    {
      icon: Star,
      badge: 'Premium',
      title: 'Airport Concierge',
      discount: 'Special Rate',
      description: 'Flat rate airport transfers with personalized meet & greet service',
      terms: 'Valid for major airports. Includes flight tracking and 1 hour wait time.',
      validUntil: 'Ongoing',
    },
    {
      icon: Clock,
      badge: 'Business',
      title: 'Corporate Program',
      discount: 'Custom Pricing',
      description: 'Bespoke transportation solutions for enterprises and executive teams',
      terms: 'Dedicated account manager. Monthly billing. Volume discounts available.',
      validUntil: 'Contact for details',
    },
  ];

  const seasonal = [
    {
      title: 'Holiday Season Special',
      description: 'Premium service for the holiday season with refined festive touches',
      image: 'https://images.pexels.com/photos/3201920/pexels-photo-3201920.jpeg?auto=compress&cs=tinysrgb&w=1200',
      discount: '20% OFF',
      validUntil: 'December 31, 2024',
    },
    {
      title: 'Spring Escape Package',
      description: 'Perfect for coastal destinations and exclusive resort transfers',
      image: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      discount: '15% OFF',
      validUntil: 'March 31, 2025',
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-900">
      <SiteHeader />

      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-gold-400 inline-block px-8 py-3 mb-8">
                <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">
                  SPECIAL OFFERS
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-ivory font-heading">
                Exclusive Benefits
              </h1>
              <p className="text-xl text-ivory/70 font-light max-w-2xl mx-auto font-body">
                Curated privileges and promotions for our distinguished clientele
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {offers.map((offer, idx) => (
                <Card key={idx} className="p-8 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-4 py-2 bg-gold-400 text-emerald-900 text-xs font-medium tracking-wide">
                    {offer.badge}
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mb-6">
                    <offer.icon className="w-7 h-7 text-gold-400" />
                  </div>
                  <div className="mb-6">
                    <div className="text-3xl font-light mb-3 text-gold-400 font-heading">{offer.discount}</div>
                    <h3 className="text-xl font-light text-ivory font-heading">{offer.title}</h3>
                  </div>
                  <p className="text-sm text-ivory/70 font-light mb-6 font-body leading-relaxed">{offer.description}</p>
                  <div className="text-xs text-ivory/50 font-light mb-4 border-t border-gold-400/20 pt-4 font-body leading-relaxed">
                    {offer.terms}
                  </div>
                  <div className="flex items-center justify-between text-xs mb-6">
                    <span className="text-ivory/60 font-light font-body">Valid until:</span>
                    <span className="font-medium text-gold-400 font-body">{offer.validUntil}</span>
                  </div>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide font-body">
                      CLAIM OFFER
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="mb-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Seasonal Promotions</h2>
                <p className="text-lg text-ivory/70 font-light font-body">
                  Limited-time offers for special occasions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {seasonal.map((promo, idx) => (
                  <Card key={idx} className="overflow-hidden bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 group">
                    <div className="relative aspect-[16/9] overflow-hidden bg-emerald-950">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-gold-400 text-emerald-900 px-4 py-2 rounded-full text-sm font-medium">
                        {promo.discount}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-light mb-4 text-ivory font-heading">{promo.title}</h3>
                      <p className="text-ivory/70 font-light mb-6 font-body leading-relaxed">{promo.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-ivory/60 font-light font-body">Valid until {promo.validUntil}</span>
                        <Link href="/auth/signup">
                          <Button className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide font-body">
                            RESERVE
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-emerald-800 border-t border-gold-400/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Begin Your Journey</h2>
            <p className="text-lg text-ivory/70 font-light mb-12 font-body leading-relaxed">
              Join Aurello today and start enjoying exclusive member privileges
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide px-12 h-14 font-body shadow-lg shadow-gold-400/20"
              >
                BECOME A MEMBER
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20 px-6 bg-emerald-900/50 border-t border-gold-400/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4 text-ivory font-heading">Terms & Conditions</h2>
            </div>
            <div className="space-y-4 text-sm text-ivory/60 font-light font-body">
              <p>
                • All offers are subject to availability and may be modified or discontinued at any time without notice
              </p>
              <p>
                • Discounts cannot be combined with other offers unless explicitly stated
              </p>
              <p>
                • First ride discount valid for new members only and limited to one use per account
              </p>
              <p>
                • Corporate and monthly plans require separate agreements and qualification criteria
              </p>
              <p>
                • All prices shown are before applicable taxes and fees
              </p>
              <p>
                • Promotional credits expire 12 months from date of issue
              </p>
              <p>
                • Aurello reserves the right to verify eligibility for all promotional offers
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
