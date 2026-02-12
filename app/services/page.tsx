'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, MapPin, Clock, Star, Car, Users, Calendar, Briefcase } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-emerald-deep text-ivory">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-deep/80 backdrop-blur-md border-b border-champagne/20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-champagne" />
              <span className="text-xl font-light tracking-[0.2em] text-ivory font-heading">APEX</span>
            </Link>
            <div className="hidden lg:flex items-center gap-12">
              <Link href="/services" className="text-sm text-champagne transition-colors tracking-wide font-body">SERVICES</Link>
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
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">BESPOKE TRANSPORT</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 font-heading">
                Our Services
              </h1>
              <p className="text-xl text-ivory/90 font-light max-w-2xl mx-auto font-body leading-relaxed">
                Comprehensive transportation solutions tailored to your lifestyle
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <Card key={idx} className="p-10 bg-emerald-dark/50 border-2 border-champagne/20 hover:border-champagne/60 transition-all hover:bg-emerald-dark duration-300">
                  <div className="w-14 h-14 rounded-full border-2 border-champagne/40 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-champagne" />
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-champagne font-heading">{service.title}</h3>
                  <p className="text-sm text-ivory/90 font-light mb-6 leading-relaxed font-body">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-1 h-1 rounded-full bg-champagne" />
                        <span className="font-light text-ivory/95 font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-medium border-t border-champagne/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-light mb-8 font-heading">Ready to Book?</h2>
            <p className="text-xl text-ivory/90 font-light mb-12 font-body">
              Experience exceptional service with APEX
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-champagne hover:bg-champagne-light text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-lg shadow-champagne/20"
                >
                  BECOME A MEMBER
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-champagne/40 text-champagne hover:bg-champagne hover:text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body"
                >
                  CONTACT CONCIERGE
                </Button>
              </Link>
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
