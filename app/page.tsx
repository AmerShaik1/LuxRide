'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Car, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'chauffeur') {
        router.push('/driver');
      } else {
        router.push('/rider');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-900">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-900 text-ivory">
      <SiteHeader />

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-emerald-950">
          <div className="absolute inset-0 bg-emerald-950">
            <img
              src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury chauffeur service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/95 via-emerald-900/90 to-emerald-900/95" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
            <div className="mb-8">
              <div className="inline-block border border-gold-400/50 px-6 py-2 mb-8">
                <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">EST. 2024</span>
              </div>
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 leading-none font-heading text-ivory">
              DISCREET
              <br />
              <span className="text-gold-400 italic">LUXURY</span>
            </h1>
            <p className="text-xl md:text-2xl text-ivory/80 mb-16 max-w-3xl mx-auto font-light leading-relaxed font-body">
              Bespoke chauffeur experiences for the most discerning clientele
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-lg shadow-gold-400/20"
              >
                INQUIRE NOW
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center text-gold-400/40">
              <span className="text-xs tracking-widest mb-2 font-body">SCROLL</span>
              <div className="w-px h-16 bg-gradient-to-b from-gold-400/40 to-transparent" />
            </div>
          </div>
        </section>

        <section className="py-24 px-8 bg-emerald-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="border-l-2 border-r-2 border-gold-400 inline-block px-8 py-3 mb-8">
                <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">
                  YOUR EXPERIENCE
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 font-heading">
                Choose Your Path
              </h2>
              <p className="text-lg text-ivory/70 font-light leading-relaxed max-w-2xl mx-auto font-body">
                Whether you seek premium transportation or wish to join our elite chauffeur network
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-emerald-900/50 border-2 border-gold-400/20 hover:border-gold-400 transition-all duration-500 overflow-hidden group">
                <CardContent className="p-12">
                  <div className="mb-8">
                    <Car className="w-12 h-12 text-gold-400 mb-6" />
                    <h3 className="text-3xl font-light mb-4 font-heading text-ivory">
                      Ride with Aurello
                    </h3>
                    <p className="text-ivory/70 font-light leading-relaxed font-body mb-8">
                      Experience unparalleled luxury and discretion with our curated fleet and professional chauffeurs. From boardroom to ballroom, we deliver seamless, white-glove service.
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold-400 mt-2" />
                      <span className="text-sm text-ivory/80 font-body">
                        Priority dispatch & concierge support
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold-400 mt-2" />
                      <span className="text-sm text-ivory/80 font-body">
                        Curated fleet of luxury vehicles
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold-400 mt-2" />
                      <span className="text-sm text-ivory/80 font-body">
                        Absolute discretion & privacy
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/auth/signup?type=rider" className="block">
                      <Button className="w-full bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide h-12 font-body">
                        CREATE ACCOUNT
                      </Button>
                    </Link>
                    <Link href="/auth/login?mode=rider" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-gold-400/40 text-gold-400 hover:bg-gold-400/10 font-light tracking-wide h-12 font-body"
                      >
                        RIDER LOGIN
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-emerald-900/50 border-2 border-gold-400/20 hover:border-gold-400 transition-all duration-500 overflow-hidden group">
                <CardContent className="p-12">
                  <div className="mb-8">
                    <Briefcase className="w-12 h-12 text-gold-400 mb-6" />
                    <h3 className="text-3xl font-light mb-4 font-heading text-ivory">
                      Drive with Aurello
                    </h3>
                    <p className="text-ivory/70 font-light leading-relaxed font-body mb-8">
                      Join our exclusive network of professional chauffeurs serving ultra-high-net-worth clientele. Exceptional compensation, premium vehicles, and unmatched professionalism.
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold-400 mt-2" />
                      <span className="text-sm text-ivory/80 font-body">
                        Premium earnings & incentives
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold-400 mt-2" />
                      <span className="text-sm text-ivory/80 font-body">
                        Drive luxury vehicles
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold-400 mt-2" />
                      <span className="text-sm text-ivory/80 font-body">
                        Flexible scheduling
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/auth/signup?type=driver" className="block">
                      <Button className="w-full bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide h-12 font-body">
                        APPLY NOW
                      </Button>
                    </Link>
                    <Link href="/auth/login?mode=driver" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-gold-400/40 text-gold-400 hover:bg-gold-400/10 font-light tracking-wide h-12 font-body"
                      >
                        CHAUFFEUR LOGIN
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
              <div>
                <div className="border-l-2 border-gold-400 pl-8 mb-8">
                  <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">UNPARALLELED SERVICE</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 leading-tight font-heading">
                  The Art of
                  <br />
                  <span className="italic text-gold-400">Refined Travel</span>
                </h2>
                <p className="text-lg text-ivory/70 font-light leading-relaxed mb-8 font-body">
                  Aurello represents the pinnacle of luxury ground transportation. Our meticulously curated fleet and professionally trained chauffeurs ensure every journey is an experience in sophistication.
                </p>
                <p className="text-lg text-ivory/70 font-light leading-relaxed font-body">
                  From boardroom to ballroom, we deliver seamless, discreet service that exceeds the expectations of the world's most accomplished individuals.
                </p>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden shadow-2xl shadow-gold-400/20">
                <img
                  src="https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Luxury interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-gold-400/40" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="text-center group cursor-pointer">
                <div className="w-1 h-16 bg-gold-400 mx-auto mb-6 group-hover:h-20 transition-all duration-300" />
                <h3 className="text-2xl font-light mb-4 tracking-wide text-gold-400 font-heading">Discretion</h3>
                <p className="text-ivory/70 font-light leading-relaxed font-body">
                  Absolute confidentiality and privacy for every journey
                </p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-1 h-16 bg-gold-400 mx-auto mb-6 group-hover:h-20 transition-all duration-300" />
                <h3 className="text-2xl font-light mb-4 tracking-wide text-gold-400 font-heading">Excellence</h3>
                <p className="text-ivory/70 font-light leading-relaxed font-body">
                  Impeccably maintained vehicles and white-glove service
                </p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-1 h-16 bg-gold-400 mx-auto mb-6 group-hover:h-20 transition-all duration-300" />
                <h3 className="text-2xl font-light mb-4 tracking-wide text-gold-400 font-heading">Precision</h3>
                <p className="text-ivory/70 font-light leading-relaxed font-body">
                  Punctual, reliable service tailored to your schedule
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-32 px-8 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury fleet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-emerald-900/80" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="border-l-2 border-r-2 border-gold-400 py-16 px-8 bg-emerald-900/40 backdrop-blur-sm">
              <span className="text-gold-400 text-sm tracking-[0.3em] font-light mb-8 block font-body">EXQUISITE COLLECTION</span>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 font-heading">
                Curated Fleet
              </h2>
              <p className="text-xl text-ivory/80 font-light leading-relaxed mb-12 font-body">
                From Rolls-Royce Phantoms to Mercedes-Maybach, our collection features the world's most prestigious automobiles, each selected for its uncompromising luxury and performance.
              </p>
              <Link href="/fleet">
                <Button
                  variant="outline"
                  className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-emerald-900 font-light tracking-[0.2em] px-12 h-12 text-sm font-body transition-all duration-300"
                >
                  VIEW COLLECTION
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-gold-400 inline-block px-8 py-3 mb-8">
                <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">TESTIMONIALS</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 font-heading">
                Client Experience
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="border-2 border-gold-400/20 bg-emerald-800/50 p-12 hover:border-gold-400/60 hover:bg-emerald-800 transition-all duration-500">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gold-400" />
                  ))}
                </div>
                <p className="text-lg text-ivory/85 font-light leading-relaxed mb-8 italic font-body">
                  "Aurello has redefined luxury transportation. Their attention to detail and commitment to excellence is unmatched."
                </p>
                <div className="border-t border-gold-400/20 pt-6">
                  <p className="text-sm tracking-wider text-gold-400 font-body">JAMES RICHARDSON</p>
                  <p className="text-xs text-ivory/50 mt-1 font-body">CEO, Fortune 500</p>
                </div>
              </div>

              <div className="border-2 border-gold-400/20 bg-emerald-800/50 p-12 hover:border-gold-400/60 hover:bg-emerald-800 transition-all duration-500">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gold-400" />
                  ))}
                </div>
                <p className="text-lg text-ivory/85 font-light leading-relaxed mb-8 italic font-body">
                  "Impeccable service, exceptional vehicles, and absolute discretion. Aurello is our exclusive choice for all executive travel."
                </p>
                <div className="border-t border-gold-400/20 pt-6">
                  <p className="text-sm tracking-wider text-gold-400 font-body">VICTORIA CHEN</p>
                  <p className="text-xs text-ivory/50 mt-1 font-body">Private Client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-700 border-t border-gold-400/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <span className="text-gold-400 text-sm tracking-[0.3em] font-light font-body">EXCLUSIVE MEMBERSHIP</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 font-heading">
              Begin Your Journey
            </h2>
            <p className="text-xl text-ivory/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto font-body">
              Experience the difference that true luxury makes. Our concierge team is available to discuss your requirements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-lg shadow-gold-400/20 transition-all duration-300"
                >
                  BECOME A MEMBER
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold-400/40 text-gold-400 hover:bg-gold-400 hover:text-emerald-900 font-light tracking-[0.2em] px-12 h-14 text-sm font-body transition-all duration-300"
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
