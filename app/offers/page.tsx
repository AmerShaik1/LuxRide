'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Percent, Gift, Calendar, Star, Clock } from 'lucide-react';
import Link from 'next/link';

export default function OffersPage() {
  const offers = [
    {
      icon: Percent,
      badge: 'Limited Time',
      title: 'First Ride Discount',
      discount: '25% OFF',
      description: 'Experience APEX luxury with an exclusive discount on your first ride',
      terms: 'Valid for new members only. Maximum discount $100. Valid until end of month.',
      validUntil: 'December 31, 2024',
    },
    {
      icon: Gift,
      badge: 'New',
      title: 'Referral Bonus',
      discount: '$50 Credit',
      description: 'Refer a friend and both receive $50 credit when they complete their first ride',
      terms: 'No limit on referrals. Credit applied after friend\'s first completed ride.',
      validUntil: 'Ongoing',
    },
    {
      icon: Calendar,
      badge: 'Exclusive',
      title: 'Monthly Pass',
      discount: '30% OFF',
      description: 'Unlimited rides with 30% discount. Perfect for frequent travelers',
      terms: 'Minimum 10 rides per month. Premium vehicles included. Annual commitment.',
      validUntil: 'Limited availability',
    },
    {
      icon: Star,
      badge: 'Premium',
      title: 'Airport Package',
      discount: 'Special Rate',
      description: 'Flat rate airport transfers with meet & greet included',
      terms: 'Valid for major airports. Includes flight tracking and 1 hour wait time.',
      validUntil: 'Ongoing',
    },
    {
      icon: Clock,
      badge: 'Business',
      title: 'Corporate Plan',
      discount: 'Custom Pricing',
      description: 'Tailored transportation solutions for businesses and teams',
      terms: 'Dedicated account manager. Monthly billing. Volume discounts available.',
      validUntil: 'Contact for details',
    },
  ];

  const seasonal = [
    {
      title: 'Holiday Special',
      description: 'Premium service for the holiday season with festive touches',
      image: 'https://images.pexels.com/photos/3201920/pexels-photo-3201920.jpeg?auto=compress&cs=tinysrgb&w=1200',
      discount: '20% OFF',
      validUntil: 'December 31, 2024',
    },
    {
      title: 'Spring Break Package',
      description: 'Perfect for coastal destinations and resort transfers',
      image: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      discount: '15% OFF',
      validUntil: 'March 31, 2025',
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-deep text-ivory">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-deep/80 backdrop-blur-md border-b border-champagne/20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-champagne" />
              <span className="text-xl font-light tracking-[0.2em] text-ivory font-heading">APEX</span>
            </Link>
            <div className="hidden lg:flex items-center gap-12">
              <Link href="/services" className="text-sm text-ivory/90 hover:text-champagne transition-colors tracking-wide font-body">SERVICES</Link>
              <Link href="/fleet" className="text-sm text-ivory/90 hover:text-champagne transition-colors tracking-wide font-body">FLEET</Link>
              <Link href="/about" className="text-sm text-ivory/90 hover:text-champagne transition-colors tracking-wide font-body">ABOUT</Link>
              <Link href="/contact" className="text-sm text-ivory/90 hover:text-champagne transition-colors tracking-wide font-body">CONTACT</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-ivory hover:bg-champagne/10 font-light tracking-wide font-body">
                  MEMBER LOGIN
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-champagne hover:bg-champagne-light text-black font-light tracking-wide px-8 font-body">
                  RESERVE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section className="py-32 px-8 bg-emerald-deep">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">EXCLUSIVE BENEFITS</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 font-heading">
                Special Offers
              </h1>
              <p className="text-xl text-ivory/90 font-light max-w-2xl mx-auto font-body leading-relaxed">
                Exclusive benefits and promotions for discerning clients
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
              {offers.map((offer, idx) => (
                <Card key={idx} className="p-10 bg-emerald-dark/50 border-2 border-champagne/20 hover:border-champagne/60 transition-all hover:bg-emerald-dark duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-4 py-2 bg-champagne text-black text-xs font-light tracking-wider">
                    {offer.badge}
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-champagne/40 flex items-center justify-center mb-8">
                    <offer.icon className="w-7 h-7 text-champagne" />
                  </div>
                  <div className="mb-6">
                    <div className="text-4xl font-light mb-3 text-champagne font-heading">{offer.discount}</div>
                    <h3 className="text-2xl font-light text-ivory">{offer.title}</h3>
                  </div>
                  <p className="text-sm text-ivory/90 font-light mb-8 leading-relaxed font-body">{offer.description}</p>
                  <div className="text-xs text-ivory/75 font-light mb-6 border-t border-champagne/20 pt-6 leading-relaxed font-body">
                    {offer.terms}
                  </div>
                  <div className="flex items-center justify-between text-xs mb-8">
                    <span className="text-ivory/85 font-light font-body">Valid until:</span>
                    <span className="font-light text-champagne font-body">{offer.validUntil}</span>
                  </div>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-champagne hover:bg-champagne-light text-black font-light tracking-wide font-body">
                      CLAIM OFFER
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="mb-20">
              <div className="text-center mb-16">
                <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
                  <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">SEASONAL</span>
                </div>
                <h2 className="text-5xl font-light mb-6 font-heading">Seasonal Promotions</h2>
                <p className="text-xl text-ivory/90 font-light font-body leading-relaxed">
                  Limited-time offers for special occasions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {seasonal.map((promo, idx) => (
                  <Card key={idx} className="overflow-hidden bg-emerald-dark/50 border-2 border-champagne/20 hover:border-champagne/60 transition-all hover:bg-emerald-dark duration-300 group">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-emerald-deep/30" />
                      <div className="absolute top-4 right-4 bg-champagne text-black px-4 py-2 text-sm font-light tracking-wider">
                        {promo.discount}
                      </div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-3xl font-light mb-4 text-champagne font-heading">{promo.title}</h3>
                      <p className="text-ivory/90 font-light mb-6 leading-relaxed font-body">{promo.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ivory/85 font-light font-body">Valid until {promo.validUntil}</span>
                        <Link href="/auth/signup">
                          <Button variant="outline" className="border-champagne/40 text-champagne hover:bg-champagne hover:text-black font-light tracking-wide font-body">
                            LEARN MORE
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

        <section className="py-32 px-8 bg-emerald-medium border-t border-champagne/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-light mb-8 font-heading">Ready to Save?</h2>
            <p className="text-xl text-ivory/90 font-light mb-12 font-body leading-relaxed">
              Join APEX today and start enjoying exclusive member benefits
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-champagne hover:bg-champagne-light text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-lg shadow-champagne/20"
              >
                BECOME A MEMBER
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-dark border-t border-champagne/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-6 font-heading">Terms & Conditions</h2>
            </div>
            <div className="space-y-6 text-sm text-ivory/90 font-light font-body leading-relaxed">
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
                • APEX reserves the right to verify eligibility for all promotional offers
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-champagne/20 py-16 px-8 bg-emerald-deep">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-champagne" />
              <span className="text-xl font-light tracking-[0.2em] text-ivory font-heading">APEX</span>
            </div>
            <p className="text-sm text-ivory/75 font-light tracking-wide font-body">
              Extraordinary journeys for extraordinary lives
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-ivory/85">
            <Link href="/services" className="hover:text-champagne transition-colors tracking-wide font-body">Services</Link>
            <Link href="/fleet" className="hover:text-champagne transition-colors tracking-wide font-body">Fleet</Link>
            <Link href="/about" className="hover:text-champagne transition-colors tracking-wide font-body">About</Link>
            <Link href="/contact" className="hover:text-champagne transition-colors tracking-wide font-body">Contact</Link>
          </div>

          <div className="text-center pt-8 border-t border-champagne/20">
            <p className="text-xs text-ivory/40 tracking-wider font-body">&copy; 2024 APEX. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
