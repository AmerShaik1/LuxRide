'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Award, Heart, Globe, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

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
    { value: '50K+', label: 'Completed Journeys' },
    { value: '5,000+', label: 'Distinguished Clients' },
    { value: '100+', label: 'Luxury Vehicles' },
    { value: '4.98', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-emerald-900">
      <SiteHeader />

      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="border-l-2 border-r-2 border-gold-400 inline-block px-8 py-3 mb-8">
              <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">
                OUR STORY
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-8 text-ivory font-heading">
              About Aurello
            </h1>
            <p className="text-xl text-ivory/70 font-light leading-relaxed font-body">
              Founded on the principle that luxury transportation should be effortless, discreet, and exceptional, Aurello has redefined premium mobility services. We serve discerning clients who demand the highest standards of service, safety, and sophistication.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 bg-emerald-800 border-y border-gold-400/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-light mb-3 text-gold-400 font-heading">{stat.value}</div>
                  <div className="text-sm text-ivory/70 font-light font-body tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Our Values</h2>
              <p className="text-lg text-ivory/70 font-light max-w-2xl mx-auto font-body">
                Principles that guide every interaction and service
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <Card key={idx} className="p-8 bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 text-center">
                  <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-gold-400" />
                  </div>
                  <h3 className="text-lg font-light mb-4 text-ivory font-heading">{value.title}</h3>
                  <p className="text-sm text-ivory/70 font-light font-body leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-emerald-800 border-y border-gold-400/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Our Commitment</h2>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-light mb-3 text-ivory font-heading">Professional Chauffeurs</h3>
                  <p className="text-ivory/70 font-light font-body leading-relaxed">
                    Every chauffeur undergoes extensive background checks, professional training, and continuous evaluation. They embody professionalism, discretion, and local expertise.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-light mb-3 text-ivory font-heading">Continuous Innovation</h3>
                  <p className="text-ivory/70 font-light font-body leading-relaxed">
                    We constantly evolve our services, technology, and fleet to exceed expectations. From real-time tracking to seamless booking, innovation drives our service delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <Globe className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-light mb-3 text-ivory font-heading">Global Network</h3>
                  <p className="text-ivory/70 font-light font-body leading-relaxed">
                    Operating in major cities worldwide, we maintain consistent service standards. Whether in New York, London, or Tokyo, Aurello delivers the same exceptional experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Join the Aurello Experience</h2>
            <p className="text-lg text-ivory/70 font-light mb-12 font-body leading-relaxed">
              Discover why leading executives, celebrities, and discerning travelers trust Aurello
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
      </main>

      <SiteFooter />
    </div>
  );
}
