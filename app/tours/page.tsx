'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Clock, MapPin, Star, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ToursPage() {
  const tours = [
    {
      name: 'City Highlights',
      duration: '4 hours',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Discover iconic landmarks and hidden gems with expert local guidance',
      highlights: ['Historic districts', 'Cultural landmarks', 'Photo opportunities', 'Local insights'],
      price: '$450',
    },
    {
      name: 'Wine Country Experience',
      duration: '8 hours',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Curated vineyard visits with exclusive tastings and gourmet lunch',
      highlights: ['3 premier wineries', 'Private tastings', 'Gourmet lunch', 'Scenic routes'],
      price: '$850',
    },
    {
      name: 'Coastal Drive',
      duration: '6 hours',
      image: 'https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Breathtaking coastal views with stops at pristine beaches and viewpoints',
      highlights: ['Oceanfront routes', 'Beach stops', 'Luxury picnic', 'Photography time'],
      price: '$650',
    },
    {
      name: 'Mountain Retreat',
      duration: '7 hours',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Escape to serene mountain landscapes with spa and dining options',
      highlights: ['Scenic mountain roads', 'Spa access', 'Fine dining', 'Nature walks'],
      price: '$750',
    },
    {
      name: 'Culinary Journey',
      duration: '5 hours',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Exclusive access to renowned restaurants and local food markets',
      highlights: ['Michelin-starred dining', 'Market tours', 'Chef interactions', 'Tasting menus'],
      price: '$950',
    },
    {
      name: 'Arts & Culture',
      duration: '5 hours',
      image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Immersive cultural experience through galleries, museums, and theaters',
      highlights: ['Private gallery tours', 'Museum access', 'Theater districts', 'Art scene insights'],
      price: '$550',
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
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">CURATED JOURNEYS</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 font-heading">
                Curated Tours
              </h1>
              <p className="text-xl text-ivory/90 font-light max-w-2xl mx-auto font-body leading-relaxed">
                Exclusive experiences crafted for discerning travelers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour, idx) => (
                <Card key={idx} className="overflow-hidden bg-emerald-dark/50 border-2 border-champagne/20 hover:border-champagne/60 transition-all hover:bg-emerald-dark duration-300 group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-emerald-deep/20" />
                    <div className="absolute top-4 right-4 bg-champagne backdrop-blur-sm px-3 py-2 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-black" />
                      <span className="text-xs font-medium text-black">{tour.duration}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-light text-champagne font-heading">{tour.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-champagne text-champagne" />
                        <span className="text-sm font-light text-champagne">5.0</span>
                      </div>
                    </div>
                    <p className="text-sm text-ivory/90 font-light mb-6 font-body">{tour.description}</p>
                    <div className="space-y-3 mb-6">
                      {tour.highlights.map((highlight, hidx) => (
                        <div key={hidx} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-champagne" />
                          <span className="text-sm font-light text-ivory/90 font-body">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-light text-champagne font-heading">{tour.price}</span>
                      <Link href="/auth/signup">
                        <Button variant="outline" className="border-champagne/40 text-champagne hover:bg-champagne hover:text-black font-light tracking-wide font-body">
                          BOOK TOUR
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-dark border-t border-champagne/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">BESPOKE</span>
              </div>
              <h2 className="text-5xl font-light mb-8 font-heading">Custom Itineraries</h2>
              <p className="text-xl text-ivory/90 font-light max-w-2xl mx-auto font-body leading-relaxed">
                Every tour can be personalized to match your interests and schedule
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-xl font-light mb-3 text-champagne font-heading">Flexible Routes</h3>
                <p className="text-sm text-ivory/90 font-light font-body">
                  Adjust stops and destinations on the fly
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-xl font-light mb-3 text-champagne font-heading">Your Schedule</h3>
                <p className="text-sm text-ivory/90 font-light font-body">
                  Tours available daily at your convenience
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-2 border-champagne/40 flex items-center justify-center mx-auto mb-6">
                  <Star className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-xl font-light mb-3 text-champagne font-heading">Expert Guides</h3>
                <p className="text-sm text-ivory/90 font-light font-body">
                  Chauffeurs with deep local knowledge
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-champagne hover:bg-champagne-light text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-lg shadow-champagne/20"
                >
                  PLAN CUSTOM TOUR
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
