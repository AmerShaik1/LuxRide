'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Star, Car, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function ServicesPage() {
  const services = [
    {
      icon: Car,
      title: 'Point-to-Point Transfer',
      description: 'Direct transportation to your destination with unparalleled comfort and discretion.',
      features: ['Real-time tracking', 'Professional chauffeurs', 'Premium vehicles', 'Flight monitoring'],
    },
    {
      icon: Clock,
      title: 'Hourly Charter',
      description: 'Flexible transportation for multiple stops, meetings, or extended events.',
      features: ['Minimum 3 hours', 'Unlimited stops', 'Wait time included', 'Priority scheduling'],
    },
    {
      icon: Users,
      title: 'Corporate Solutions',
      description: 'Tailored transportation programs for businesses and executives.',
      features: ['Dedicated account manager', 'Monthly billing', 'Usage analytics', 'Multiple riders'],
    },
    {
      icon: Star,
      title: 'Special Events',
      description: 'Sophisticated transportation for weddings, galas, and special occasions.',
      features: ['Event coordination', 'Multiple vehicles', 'Red carpet service', 'Extended availability'],
    },
    {
      icon: MapPin,
      title: 'Airport Transfer',
      description: 'Seamless airport transportation with meet-and-greet and luggage assistance.',
      features: ['Flight tracking', 'Meet & greet', 'Luggage assistance', 'Global coverage'],
    },
    {
      icon: Calendar,
      title: 'City Tours',
      description: 'Curated exploration of premier destinations with knowledgeable chauffeurs.',
      features: ['Custom itineraries', 'Local expertise', 'Photo opportunities', 'Flexible duration'],
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
                  OUR SERVICES
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-ivory font-heading">
                Bespoke Transportation
              </h1>
              <p className="text-xl text-ivory/70 font-light max-w-2xl mx-auto font-body">
                Comprehensive solutions tailored to the most discerning clientele
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <Card key={idx} className="p-8 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10">
                  <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-gold-400" />
                  </div>
                  <h3 className="text-2xl font-light mb-3 text-ivory font-heading">{service.title}</h3>
                  <p className="text-sm text-ivory/70 font-light mb-6 font-body leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span className="font-light text-ivory/80 font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-emerald-800 border-t border-gold-400/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Ready to Reserve?</h2>
            <p className="text-lg text-ivory/70 font-light mb-12 font-body leading-relaxed">
              Experience the Aurello difference in luxury ground transportation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide px-12 h-14 font-body shadow-lg shadow-gold-400/20"
                >
                  BECOME A MEMBER
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold-400/40 text-gold-400 hover:bg-gold-400 hover:text-emerald-900 font-light tracking-wide px-12 h-14 font-body"
                >
                  CONTACT CONCIERGE
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
