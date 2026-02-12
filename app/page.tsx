'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

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
      <div className="min-h-screen flex items-center justify-center bg-emerald-deep">
        <div className="animate-pulse">
          <Shield className="w-12 h-12 text-champagne" />
        </div>
      </div>
    );
  }

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
              <Link href="/services" className="text-sm text-ivory hover:text-champagne transition-colors tracking-wide font-body">SERVICES</Link>
              <Link href="/fleet" className="text-sm text-ivory hover:text-champagne transition-colors tracking-wide font-body">FLEET</Link>
              <Link href="/about" className="text-sm text-ivory hover:text-champagne transition-colors tracking-wide font-body">ABOUT</Link>
              <Link href="/contact" className="text-sm text-ivory hover:text-champagne transition-colors tracking-wide font-body">CONTACT</Link>
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

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury Rolls-Royce"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/95 via-emerald-deep/85 to-emerald-deep" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
            <div className="mb-8">
              <div className="inline-block border border-champagne/50 px-6 py-2 mb-8 bg-emerald-deep/40 backdrop-blur-sm shadow-lg">
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body drop-shadow-lg">EST. 2024</span>
              </div>
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 leading-none font-heading text-ivory drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              TIMELESS
              <br />
              <span className="text-champagne italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">ELEGANCE</span>
            </h1>
            <p className="text-xl md:text-2xl text-ivory mb-16 max-w-3xl mx-auto font-light leading-relaxed font-body drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Bespoke chauffeur experiences for the most discerning clientele
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-champagne hover:bg-champagne-light text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-xl shadow-black/50"
              >
                INQUIRE NOW
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center text-champagne/40">
              <span className="text-xs tracking-widest mb-2 font-body">SCROLL</span>
              <div className="w-px h-16 bg-gradient-to-b from-champagne/40 to-transparent" />
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-deep">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
              <div>
                <div className="border-l-2 border-champagne pl-8 mb-8">
                  <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">UNPARALLELED SERVICE</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 leading-tight font-heading">
                  The Art of
                  <br />
                  <span className="italic text-champagne">Refined Travel</span>
                </h2>
                <p className="text-lg text-ivory/90 font-light leading-relaxed mb-8 font-body">
                  APEX represents the pinnacle of luxury ground transportation. Our meticulously curated fleet and professionally trained chauffeurs ensure every journey is an experience in sophistication.
                </p>
                <p className="text-lg text-ivory/90 font-light leading-relaxed font-body">
                  From boardroom to ballroom, we deliver seamless, discreet service that exceeds the expectations of the world's most accomplished individuals.
                </p>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden shadow-2xl shadow-champagne/20">
                <img
                  src="https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Luxury interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-champagne/40" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="text-center group cursor-pointer">
                <div className="w-1 h-16 bg-champagne mx-auto mb-6 group-hover:h-20 transition-all duration-300" />
                <h3 className="text-2xl font-light mb-4 tracking-wide text-champagne font-heading">Discretion</h3>
                <p className="text-ivory/90 font-light leading-relaxed font-body">
                  Absolute confidentiality and privacy for every journey
                </p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-1 h-16 bg-champagne mx-auto mb-6 group-hover:h-20 transition-all duration-300" />
                <h3 className="text-2xl font-light mb-4 tracking-wide text-champagne font-heading">Excellence</h3>
                <p className="text-ivory/90 font-light leading-relaxed font-body">
                  Impeccably maintained vehicles and white-glove service
                </p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-1 h-16 bg-champagne mx-auto mb-6 group-hover:h-20 transition-all duration-300" />
                <h3 className="text-2xl font-light mb-4 tracking-wide text-champagne font-heading">Precision</h3>
                <p className="text-ivory/90 font-light leading-relaxed font-body">
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
            <div className="absolute inset-0 bg-emerald-deep/80" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="border-l-2 border-r-2 border-champagne py-16 px-8 bg-emerald-deep/40 backdrop-blur-sm">
              <span className="text-champagne text-sm tracking-[0.3em] font-light mb-8 block font-body">EXQUISITE COLLECTION</span>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 font-heading">
                Curated Fleet
              </h2>
              <p className="text-xl text-ivory/95 font-light leading-relaxed mb-12 font-body">
                From Rolls-Royce Phantoms to Mercedes-Maybach, our collection features the world's most prestigious automobiles, each selected for its uncompromising luxury and performance.
              </p>
              <Link href="/fleet">
                <Button
                  variant="outline"
                  className="border-champagne text-champagne hover:bg-champagne hover:text-black font-light tracking-[0.2em] px-12 h-12 text-sm font-body transition-all duration-300"
                >
                  VIEW COLLECTION
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-dark">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="border-l-2 border-r-2 border-champagne inline-block px-8 py-3 mb-8">
                <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">TESTIMONIALS</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 font-heading">
                Client Experience
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="border-2 border-champagne/20 bg-emerald-deep/50 p-12 hover:border-champagne/60 hover:bg-emerald-deep transition-all duration-500">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-champagne" />
                  ))}
                </div>
                <p className="text-lg text-ivory/85 font-light leading-relaxed mb-8 italic font-body">
                  "APEX has redefined luxury transportation. Their attention to detail and commitment to excellence is unmatched."
                </p>
                <div className="border-t border-champagne/20 pt-6">
                  <p className="text-sm tracking-wider text-champagne font-body">JAMES RICHARDSON</p>
                  <p className="text-xs text-ivory/75 mt-1 font-body">CEO, Fortune 500</p>
                </div>
              </div>

              <div className="border-2 border-champagne/20 bg-emerald-deep/50 p-12 hover:border-champagne/60 hover:bg-emerald-deep transition-all duration-500">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-champagne" />
                  ))}
                </div>
                <p className="text-lg text-ivory/85 font-light leading-relaxed mb-8 italic font-body">
                  "Impeccable service, exceptional vehicles, and absolute discretion. APEX is our exclusive choice for all executive travel."
                </p>
                <div className="border-t border-champagne/20 pt-6">
                  <p className="text-sm tracking-wider text-champagne font-body">VICTORIA CHEN</p>
                  <p className="text-xs text-ivory/75 mt-1 font-body">Private Client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-emerald-medium border-t border-champagne/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <span className="text-champagne text-sm tracking-[0.3em] font-light font-body">EXCLUSIVE MEMBERSHIP</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 font-heading">
              Begin Your Journey
            </h2>
            <p className="text-xl text-ivory/90 font-light leading-relaxed mb-12 max-w-2xl mx-auto font-body">
              Experience the difference that true luxury makes. Our concierge team is available to discuss your requirements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-champagne hover:bg-champagne-light text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body shadow-lg shadow-champagne/20 transition-all duration-300"
                >
                  BECOME A MEMBER
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-champagne/40 text-champagne hover:bg-champagne hover:text-black font-light tracking-[0.2em] px-12 h-14 text-sm font-body transition-all duration-300"
                >
                  CONTACT CONCIERGE
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-champagne/20">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-champagne" />
                <span className="text-sm text-ivory/85 font-body">+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-champagne" />
                <span className="text-sm text-ivory/85 font-body">concierge@apex.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-champagne" />
                <span className="text-sm text-ivory/85 font-body">24/7 Availability</span>
              </div>
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
            <Link href="/rider" className="hover:text-champagne transition-colors tracking-wide font-body">Member Portal</Link>
            <Link href="/driver" className="hover:text-champagne transition-colors tracking-wide font-body">Chauffeur Portal</Link>
          </div>

          <div className="text-center pt-8 border-t border-champagne/20">
            <p className="text-xs text-ivory/70 tracking-wider font-body">&copy; 2024 APEX. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
