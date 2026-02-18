'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronRight, Clock3, Globe, Mail, Phone, Shield, UserRound } from 'lucide-react';

import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/services', label: 'SERVICES' },
  { href: '/fleet', label: 'FLEET' },
  { href: '/tours', label: 'TOURS' },
  { href: '/offers', label: 'OFFERS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
];

const heroFrames = [
  {
    title: 'Chauffeur assurance',
    image:
      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    title: 'Black luxury fleet',
    image:
      'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
];

const valueProps = [
  {
    icon: Shield,
    title: 'Total Discretion',
    description:
      'Gold-grade privacy protocols with vetted chauffeurs and confidential dispatch standards.',
  },
  {
    icon: Globe,
    title: 'Global Hubs',
    description:
      'Seamless coordination in 40+ cities with synchronized airport and event movements.',
  },
];

const clientExperience = [
  {
    icon: Shield,
    title: 'Total Discretion',
    description: 'Private routing, encrypted ride notes, and discreet handoff etiquette across city zones.',
  },
  {
    icon: Clock3,
    title: 'Zero Latency',
    description: 'Synchronized with manifests and calendar windows for precision arrivals without drift.',
  },
];

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push(user.role === 'chauffeur' ? '/driver' : '/rider');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F2E2B]">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border border-[#E6C992]/30" />
          <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-[#E6C992]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="h-5 w-5 text-[#E6C992]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071F1C] text-[#F8F6F0] selection:bg-[#E6C992]/30">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_22%_12%,rgba(230,201,146,0.12),transparent_36%),radial-gradient(circle_at_88%_92%,rgba(230,201,146,0.08),transparent_38%)]" />

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#E6C992]/20 bg-[#071F1C]/82 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6C992]/50 bg-black/25">
              <Shield className="h-4 w-4 text-[#E6C992]" />
            </span>
            <span className="font-heading text-[2rem] font-light tracking-wide text-[#F8F6F0]">Aurello</span>
          </Link>

          <div className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[11px] tracking-[0.18em] text-[#F8F6F0]/85 transition-colors hover:text-[#E6C992]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-body text-xs tracking-[0.16em] text-[#F8F6F0] hover:bg-[#E6C992]/10 hover:text-[#F8F6F0]">
                LOGIN
              </Button>
            </Link>
            <Link href="/auth/signup?type=rider">
              <Button className="h-11 rounded-full bg-[#E6C992] px-6 font-body text-xs tracking-[0.16em] text-black hover:bg-[#F2DDB8]">
                RESERVE
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pb-20 pt-28">
        <section className="px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl border border-[#E6C992]/20 bg-[linear-gradient(125deg,rgba(7,31,28,0.98)_0%,rgba(11,38,34,0.96)_45%,rgba(19,53,47,0.95)_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(230,201,146,0.12),transparent_35%),radial-gradient(circle_at_72%_66%,rgba(230,201,146,0.08),transparent_44%)]" />

              <div className="relative grid gap-8 xl:gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[#F8F6F0]/78">
                    ESTABLISHED 2024 - GLOBAL CONCIERGE
                  </p>

                  <h1 className="mt-5 font-heading text-6xl font-light leading-[0.9] tracking-tight text-[#F8F6F0] md:text-7xl xl:text-[5.3rem]">
                    DISCREET
                    <span className="mt-1 block italic text-[#E6C992]">Luxury</span>
                  </h1>
                </div>

                <div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {heroFrames.map((frame) => (
                      <div key={frame.title} className="relative h-48 overflow-hidden border border-[#E6C992]/25 sm:h-56 lg:h-60">
                        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${frame.image}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-2.5">
                    {[0, 1, 2, 3, 4].map((dot) => (
                      <span key={dot} className={`h-2 w-2 rounded-full ${dot === 0 ? 'bg-[#E6C992]' : 'bg-[#F8F6F0]/35'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative my-9 h-px bg-gradient-to-r from-transparent via-[#E6C992]/40 to-transparent" />

              <div className="relative grid gap-8 lg:grid-cols-[0.96fr_1.04fr]">
                <div>
                  <p className="max-w-md font-body text-[1.24rem] leading-[1.18] text-[#F8F6F0]/86">
                    The gold standard in private transportation for the world&apos;s most accomplished individuals.
                  </p>

                  <div className="mt-10 flex items-center gap-4">
                    <Link href="/auth/signup?type=rider">
                      <Button className="h-11 rounded-full bg-[#E6C992] px-6 font-body text-xs tracking-[0.15em] text-black hover:bg-[#F2DDB8]">
                        RESERVE SIGNUP
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                    <div className="flex items-center gap-2.5">
                      {[0, 1, 2].map((dot) => (
                        <span key={dot} className="h-2.5 w-2.5 rounded-full bg-[#E6C992]/80" />
                      ))}
                      <ChevronRight className="h-4 w-4 text-[#E6C992]" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-body text-[2.2rem] font-semibold tracking-tight text-[#F8F6F0]">VALUE PROPS</h2>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    {valueProps.map((prop) => (
                      <article key={prop.title} className="border border-[#E6C992]/22 bg-black/20 p-5">
                        <prop.icon className="h-7 w-7 text-[#E6C992]" />
                        <h3 className="mt-3 font-body text-[1.9rem] font-medium leading-none text-[#F8F6F0]">{prop.title}</h3>
                        <p className="mt-4 max-w-sm font-body text-[1rem] leading-relaxed text-[#F8F6F0]/76">{prop.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative my-9 h-px bg-gradient-to-r from-transparent via-[#E6C992]/40 to-transparent" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                <div>
                  <h2 className="font-body text-[2.2rem] font-semibold tracking-tight text-[#F8F6F0]">CLIENT EXPERIENCE</h2>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    {clientExperience.map((item) => (
                      <article key={item.title} className="border border-[#E6C992]/22 bg-black/18 p-5">
                        <item.icon className="h-7 w-7 text-[#E6C992]" />
                        <h3 className="mt-3 font-body text-[1.85rem] font-medium leading-none text-[#F8F6F0]">{item.title}</h3>
                        <p className="mt-4 font-body text-[1rem] leading-relaxed text-[#F8F6F0]/76">{item.description}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="relative h-[360px] overflow-hidden border border-[#E6C992]/25 sm:h-[420px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1800')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl border border-[#E6C992]/20 bg-[#0B2723]/75 p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">Membership concierge</p>
                <h3 className="mt-4 font-heading text-5xl font-light leading-[1] md:text-6xl">
                  Begin your private mobility profile.
                </h3>
                <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-[#F8F6F0]/80">
                  Share your preferred cities, fleet style, and travel cadence. Our concierge team builds a transport
                  plan around your schedule and standards.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/auth/signup?type=rider">
                    <Button className="h-12 rounded-full bg-[#E6C992] px-7 font-body text-xs tracking-[0.15em] text-black hover:bg-[#F2DDB8]">
                      ARRANGE TRANSPORT
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/signup?type=driver">
                    <Button
                      variant="outline"
                      className="h-12 rounded-full border-[#E6C992]/70 bg-transparent px-7 font-body text-xs tracking-[0.15em] text-[#E6C992] hover:bg-[#E6C992] hover:text-black"
                    >
                      JOIN AS CHAUFFEUR
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-[#E6C992]/22 bg-black/20 p-5">
                  <Phone className="h-4 w-4 text-[#E6C992]" />
                  <p className="mt-3 font-body text-xs uppercase tracking-[0.16em] text-[#E6C992]/90">Direct line</p>
                  <p className="mt-2 font-body text-sm text-[#F8F6F0]/84">+1 (555) 000-0000</p>
                </div>
                <div className="border border-[#E6C992]/22 bg-black/20 p-5">
                  <Mail className="h-4 w-4 text-[#E6C992]" />
                  <p className="mt-3 font-body text-xs uppercase tracking-[0.16em] text-[#E6C992]/90">Concierge email</p>
                  <p className="mt-2 font-body text-sm text-[#F8F6F0]/84">concierge@aurello.com</p>
                </div>
                <div className="border border-[#E6C992]/22 bg-black/20 p-5 sm:col-span-2">
                  <UserRound className="h-4 w-4 text-[#E6C992]" />
                  <p className="mt-3 font-body text-xs uppercase tracking-[0.16em] text-[#E6C992]/90">Operating hours</p>
                  <p className="mt-2 font-body text-sm text-[#F8F6F0]/84">24/7 control center with live dispatch coverage</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-16 border-t border-[#E6C992]/20 bg-[#071F1C] px-5 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6C992]/40">
                  <Shield className="h-4 w-4 text-[#E6C992]" />
                </span>
                <span className="font-heading text-3xl font-light tracking-wide">Aurello</span>
              </div>
              <p className="mt-4 font-body text-sm text-[#F8F6F0]/65">Discreet luxury mobility for accomplished lives.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
              {[
                ...navLinks,
                { href: '/auth/login', label: 'LOGIN' },
                { href: '/auth/signup?type=rider', label: 'RESERVE' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-[11px] tracking-[0.16em] text-[#F8F6F0]/78 transition-colors hover:text-[#E6C992]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-9 border-t border-[#E6C992]/20 pt-7">
            <p className="text-center font-body text-xs text-[#F8F6F0]/55">
              &copy; 2026 Aurello. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
