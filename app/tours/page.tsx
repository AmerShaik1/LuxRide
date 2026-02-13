'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, MapPin, Star, Calendar } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

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
    <div className="min-h-screen bg-emerald-900">
      <SiteHeader />

      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-gold-400 inline-block px-8 py-3 mb-8">
                <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">
                  CURATED TOURS
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-ivory font-heading">
                Bespoke Experiences
              </h1>
              <p className="text-xl text-ivory/70 font-light max-w-2xl mx-auto font-body">
                Exclusive journeys crafted for the most discerning travelers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour, idx) => (
                <Card key={idx} className="overflow-hidden bg-emerald-800/50 border-gold-400/20 hover:border-gold-400 transition-all hover:shadow-2xl hover:shadow-gold-400/10 group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-gold-400/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-900" />
                      <span className="text-xs font-medium text-emerald-900">{tour.duration}</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-gold-400/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-emerald-900 text-emerald-900" />
                      <span className="text-xs font-medium text-emerald-900">5.0</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-light text-ivory font-heading">{tour.name}</h3>
                      <span className="text-lg font-medium text-gold-400 font-body">{tour.price}</span>
                    </div>
                    <p className="text-sm text-ivory/70 font-light mb-6 font-body leading-relaxed">{tour.description}</p>
                    <div className="space-y-3 mb-6">
                      {tour.highlights.map((highlight, hidx) => (
                        <div key={hidx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                          <span className="text-sm font-light text-ivory/80 font-body">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/auth/signup">
                      <Button className="w-full bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide font-body">
                        RESERVE TOUR
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-emerald-800 border-t border-gold-400/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-ivory font-heading">Custom Itineraries</h2>
              <p className="text-lg text-ivory/70 font-light max-w-2xl mx-auto font-body leading-relaxed">
                Every tour can be personalized to match your interests and schedule
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-light mb-3 text-ivory font-heading">Flexible Routes</h3>
                <p className="text-sm text-ivory/70 font-light font-body leading-relaxed">
                  Adjust stops and destinations on the fly
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-light mb-3 text-ivory font-heading">Your Schedule</h3>
                <p className="text-sm text-ivory/70 font-light font-body leading-relaxed">
                  Tours available daily at your convenience
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                  <Star className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-light mb-3 text-ivory font-heading">Expert Guides</h3>
                <p className="text-sm text-ivory/70 font-light font-body leading-relaxed">
                  Chauffeurs with deep local knowledge
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide px-12 h-14 font-body shadow-lg shadow-gold-400/20"
                >
                  PLAN CUSTOM TOUR
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
