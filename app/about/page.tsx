'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Award, Users, Globe, Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Rigorous vetting, continuous monitoring, and highest safety standards',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Uncompromising commitment to quality in every detail',
    },
    {
      icon: Heart,
      title: 'Discretion',
      description: 'Absolute confidentiality and respect for privacy',
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Consistent luxury experience across all locations',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Completed Rides' },
    { value: '5,000+', label: 'Premium Clients' },
    { value: '100+', label: 'Luxury Vehicles' },
    { value: '4.98', label: 'Average Rating' },
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
              <Link href="/about" className="text-sm text-champagne transition-colors tracking-wide font-body">ABOUT</Link>
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
              <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">OUR STORY</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 font-heading">
              About APEX
            </h1>
            <p className="text-xl text-ivory/90 font-light leading-relaxed font-body">
              Founded on the principle that luxury transportation should be effortless, discreet, and exceptional, APEX has redefined premium mobility services. We serve discerning clients who demand the highest standards of service, safety, and sophistication.
            </p>
          </div>
        </section>

        <section className="py-20 px-8 bg-emerald-dark border-t border-champagne/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <div className="text-5xl font-light mb-3 text-champagne group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                  <div className="text-sm text-ivory/85 font-light tracking-wide font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-deep">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">PRINCIPLES</span>
              </div>
              <h2 className="text-5xl font-light mb-6 font-heading">Our Values</h2>
              <p className="text-lg text-ivory/90 font-light max-w-2xl mx-auto font-body">
                Principles that guide every interaction and service
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <Card key={idx} className="p-10 bg-emerald-dark/50 border-2 border-champagne/20 text-center hover:border-champagne/60 transition-all hover:bg-emerald-dark duration-300">
                  <div className="w-14 h-14 rounded-full border-2 border-champagne/40 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-champagne" />
                  </div>
                  <h3 className="text-xl font-light mb-3 text-champagne font-heading">{value.title}</h3>
                  <p className="text-sm text-ivory/90 font-light leading-relaxed font-body">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-dark border-t border-champagne/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">COMMITMENT</span>
              </div>
              <h2 className="text-5xl font-light mb-6 font-heading">Our Promise</h2>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-champagne" />
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-3 text-champagne font-heading">Professional Chauffeurs</h3>
                  <p className="text-ivory/90 font-light leading-relaxed font-body">
                    Every chauffeur undergoes extensive background checks, professional training, and continuous evaluation. They embody professionalism, discretion, and local expertise.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-champagne" />
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-3 text-champagne font-heading">Continuous Innovation</h3>
                  <p className="text-ivory/90 font-light leading-relaxed font-body">
                    We constantly evolve our services, technology, and fleet to exceed expectations. From real-time tracking to seamless booking, innovation drives our service delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-champagne" />
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-3 text-champagne font-heading">Global Network</h3>
                  <p className="text-ivory/90 font-light leading-relaxed font-body">
                    Operating in major cities worldwide, we maintain consistent service standards. Whether you're in New York, London, or Tokyo, APEX delivers the same exceptional experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-medium border-t border-champagne/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-light mb-8 font-heading">Join the APEX Experience</h2>
            <p className="text-xl text-ivory/90 font-light mb-12 font-body">
              Discover why leading executives, celebrities, and discerning travelers trust APEX
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
            <p className="text-xs text-ivory/70 tracking-wider font-body">&copy; 2024 APEX. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
