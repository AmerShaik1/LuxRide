'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import Image from 'next/image';

export default function FleetPage() {
  const fleet = [
    {
      category: 'Luxury Sedans',
      description: 'Perfect for executive travel and airport transfers',
      capacity: '3 passengers',
      luggage: '2 large bags',
      vehicles: [
        {
          name: 'Mercedes-Benz S-Class',
          image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200',
          features: ['Massage seats', 'Premium sound', 'Climate control', 'Privacy glass'],
          price: '$5.50/km',
        },
        {
          name: 'BMW 7 Series',
          image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1200',
          features: ['Executive lounge', 'Sky lounge', 'Gesture control', 'Laser headlights'],
          price: '$5.20/km',
        },
        {
          name: 'Audi A8',
          image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200',
          features: ['Matrix LED', 'Virtual cockpit', 'Ambient lighting', 'Sport seats'],
          price: '$5.00/km',
        },
      ],
    },
    {
      category: 'Ultra-Luxury',
      description: 'The pinnacle of automotive excellence',
      capacity: '3 passengers',
      luggage: '3 large bags',
      vehicles: [
        {
          name: 'Rolls-Royce Phantom',
          image: 'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1200',
          features: ['Starlight headliner', 'Whisper quiet', 'Champagne cooler', 'Bespoke audio'],
          price: '$12.00/km',
        },
      ],
    },
    {
      category: 'Sport Luxury',
      description: 'Dynamic performance meets refined comfort',
      capacity: '3 passengers',
      luggage: '2 large bags',
      vehicles: [
        {
          name: 'Porsche Panamera',
          image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1200',
          features: ['Sport chrono', 'Adaptive air', 'Burmester sound', 'Sport exhaust'],
          price: '$6.00/km',
        },
      ],
    },
    {
      category: 'Electric Luxury',
      description: 'Sustainable luxury without compromise',
      capacity: '4 passengers',
      luggage: '2 large bags',
      vehicles: [
        {
          name: 'Tesla Model S',
          image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1200',
          features: ['Autopilot', 'Ludicrous mode', 'Glass roof', 'Premium interior'],
          price: '$4.50/km',
        },
      ],
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
                  OUR FLEET
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-ivory font-heading">
                Curated Collection
              </h1>
              <p className="text-xl text-ivory/70 font-light max-w-2xl mx-auto font-body">
                Meticulously maintained vehicles from the world's finest manufacturers
              </p>
            </div>

            <div className="space-y-20">
              {fleet.map((category, idx) => (
                <div key={idx}>
                  <div className="mb-12">
                    <h2 className="text-3xl font-light mb-3 text-ivory font-heading">{category.category}</h2>
                    <p className="text-ivory/70 font-light mb-6 font-body text-lg">{category.description}</p>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gold-400/60" />
                        <span className="font-light text-ivory/80 font-body">{category.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-gold-400/60" />
                        <span className="font-light text-ivory/80 font-body">{category.luggage}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.vehicles.map((vehicle, vidx) => (
                      <Card key={vidx} className="overflow-hidden bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 group">
                        <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-4 right-4 bg-gold-400/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 fill-emerald-900 text-emerald-900" />
                            <span className="text-xs font-medium text-emerald-900">5.0</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-6">
                            <h3 className="text-xl font-light text-ivory font-heading">{vehicle.name}</h3>
                            <span className="text-sm font-medium text-gold-400 font-body">{vehicle.price}</span>
                          </div>
                          <div className="space-y-3 mb-8">
                            {vehicle.features.map((feature, fidx) => (
                              <div key={fidx} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                <span className="text-sm font-light text-ivory/80 font-body">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Link href="/auth/signup">
                            <Button className="w-full bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide font-body">
                              SELECT VEHICLE
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-emerald-800 border-t border-gold-400/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Experience Excellence</h2>
            <p className="text-lg text-ivory/70 font-light mb-12 font-body leading-relaxed">
              Every vehicle in our fleet represents the pinnacle of automotive engineering
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide px-12 h-14 font-body shadow-lg shadow-gold-400/20"
              >
                RESERVE NOW
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
