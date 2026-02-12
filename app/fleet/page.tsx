'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Star, Users, Briefcase, Zap } from 'lucide-react';
import Link from 'next/link';

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
              <Link href="/fleet" className="text-sm text-champagne transition-colors tracking-wide font-body">FLEET</Link>
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
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">EXQUISITE COLLECTION</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 font-heading">
                Our Fleet
              </h1>
              <p className="text-xl text-ivory/90 font-light max-w-2xl mx-auto font-body leading-relaxed">
                Meticulously maintained luxury vehicles from the world's finest manufacturers
              </p>
            </div>

            <div className="space-y-20">
              {fleet.map((category, idx) => (
                <div key={idx}>
                  <div className="mb-12 text-center">
                    <h2 className="text-4xl font-light mb-3 text-champagne font-heading">{category.category}</h2>
                    <p className="text-ivory/90 font-light mb-6 font-body">{category.description}</p>
                    <div className="flex items-center justify-center gap-8 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-champagne" />
                        <span className="font-light text-ivory/85 font-body">{category.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-champagne" />
                        <span className="font-light text-ivory/85 font-body">{category.luggage}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.vehicles.map((vehicle, vidx) => (
                      <Card key={vidx} className="overflow-hidden bg-emerald-dark/50 border-2 border-champagne/20 hover:border-champagne/60 transition-all hover:bg-emerald-dark duration-300 group">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-emerald-deep/20" />
                          <div className="absolute top-4 right-4 bg-champagne backdrop-blur-sm px-3 py-1 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-black text-black" />
                            <span className="text-xs font-medium">5.0</span>
                          </div>
                        </div>
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-6">
                            <h3 className="text-2xl font-light text-champagne font-heading">{vehicle.name}</h3>
                            <span className="text-sm font-light text-champagne font-body">{vehicle.price}</span>
                          </div>
                          <div className="space-y-3 mb-8">
                            {vehicle.features.map((feature, fidx) => (
                              <div key={fidx} className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-champagne" />
                                <span className="text-sm font-light text-ivory/90 font-body">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Link href="/auth/signup">
                            <Button className="w-full bg-champagne hover:bg-champagne-light text-black font-light tracking-wide font-body">
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

        <section className="py-32 px-8 bg-emerald-medium border-t border-champagne/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-light mb-8 font-heading">Experience Our Fleet</h2>
            <p className="text-xl text-ivory/90 font-light mb-12 font-body leading-relaxed">
              Every vehicle in our fleet represents the pinnacle of automotive excellence
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-champagne hover:bg-champagne-light text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-lg shadow-champagne/20"
              >
                RESERVE NOW
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
            <p className="text-sm text-ivory/50 font-light tracking-wide font-body">
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
