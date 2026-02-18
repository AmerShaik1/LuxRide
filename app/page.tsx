'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, Phone, Mail, Clock, Globe } from 'lucide-react';
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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-champagne/20 bg-emerald-deep/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/50 bg-emerald-deep/80">
              <Shield className="h-4 w-4 text-champagne" />
            </span>
            <span className="font-heading text-4xl font-light tracking-wide text-ivory">APEX</span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <Link href="/services" className="text-xs tracking-[0.18em] text-ivory/85 transition-colors hover:text-champagne font-body">SERVICES</Link>
            <Link href="/fleet" className="text-xs tracking-[0.18em] text-ivory/85 transition-colors hover:text-champagne font-body">FLEET</Link>
            <Link href="/about" className="text-xs tracking-[0.18em] text-ivory/85 transition-colors hover:text-champagne font-body">ABOUT</Link>
            <Link href="/contact" className="text-xs tracking-[0.18em] text-ivory/85 transition-colors hover:text-champagne font-body">CONTACT</Link>
          </div>

          <Link href="/auth/login">
            <Button className="h-11 rounded-full bg-champagne px-6 text-[11px] tracking-[0.16em] text-black hover:bg-champagne-light font-body">
              LOGIN
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden border-b border-champagne/20 px-6 pb-16 pt-28 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,201,146,0.12)_0%,_rgba(15,46,43,0)_40%),linear-gradient(120deg,_#0F2E2B_0%,_#112E2B_45%,_#1A4942_100%)]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_1.35fr]">
              <div>
                <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-ivory/75 font-body">
                  Established 2024 — Global Concierge
                </p>

                <h1 className="mb-8 font-heading text-6xl font-light leading-[0.9] tracking-tight md:text-7xl xl:text-8xl">
                  DISCREET
                  <br />
                  <span className="italic text-champagne">Luxury</span>
                </h1>

                <p className="max-w-xl text-lg leading-relaxed text-ivory/80 font-body">
                  The gold standard in private ground transportation for the world&apos;s most accomplished individuals.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href="/auth/signup">
                    <Button className="h-12 rounded-full bg-champagne px-7 text-xs tracking-[0.14em] text-black hover:bg-champagne-light font-body">
                      RESERVE SIGNUP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/services" className="border-b border-ivory/35 pb-1 text-xs tracking-[0.16em] text-ivory/90 transition-colors hover:border-champagne hover:text-champagne font-body">
                    EXPLORE SERVICES
                  </Link>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative overflow-hidden border border-champagne/30 bg-black/20">
                    <img
                      src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Professional chauffeur"
                      className="h-64 w-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden border border-champagne/30 bg-black/20">
                    <img
                      src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Luxury sedan"
                      className="h-64 w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <span
                      key={dot}
                      className={`h-2.5 w-2.5 rounded-full ${dot === 0 ? 'bg-champagne' : 'bg-ivory/35'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="my-12 h-px bg-gradient-to-r from-transparent via-champagne/45 to-transparent" />

            <div>
              <h2 className="mb-10 text-center font-heading text-4xl font-light tracking-wide md:text-5xl">VALUE PROPS</h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-sm border border-champagne/20 bg-emerald-deep/40 p-7">
                  <p className="text-ivory/80 font-body">
                    The gold standard in private transportation for the world&apos;s most accomplished travelers.
                  </p>
                </div>

                <div className="rounded-sm border border-champagne/20 bg-emerald-deep/40 p-7">
                  <Shield className="mb-5 h-8 w-8 text-champagne" />
                  <h3 className="mb-3 text-2xl font-light text-ivory font-heading">Total Discretion</h3>
                  <p className="text-ivory/75 font-body">
                    Gold-grade privacy protocols and vetted chauffeurs trained for high-profile movement.
                  </p>
                </div>

                <div className="rounded-sm border border-champagne/20 bg-emerald-deep/40 p-7">
                  <Globe className="mb-5 h-8 w-8 text-champagne" />
                  <h3 className="mb-3 text-2xl font-light text-ivory font-heading">Global Hubs</h3>
                  <p className="text-ivory/75 font-body">
                    Seamless coordination in 40+ cities with synchronized airport and event pickup windows.
                  </p>
                </div>
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
                From Rolls-Royce Phantoms to Mercedes-Maybach, our collection features the world&apos;s most prestigious automobiles, each selected for its uncompromising luxury and performance.
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
                  &quot;APEX has redefined luxury transportation. Their attention to detail and commitment to excellence is unmatched.&quot;
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
                  &quot;Impeccable service, exceptional vehicles, and absolute discretion. APEX is our exclusive choice for all executive travel.&quot;
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
