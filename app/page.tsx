'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Clock3,
  Globe,
  Lock,
  Mail,
  Phone,
  Plane,
  Shield,
  UserRound,
} from 'lucide-react';

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
    title: 'Principal-ready arrivals',
    image:
      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    title: 'White-glove interiors',
    image:
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
];

const conciergePillars = [
  {
    icon: Lock,
    title: 'Confidentiality first',
    description:
      'NDA-grade handling, encrypted movement notes, and discreet pickup protocols for principals and families.',
  },
  {
    icon: Plane,
    title: 'Aviation synchronized',
    description:
      'Flight tracking, FBO coordination, and rapid curbside transitions built for private and commercial arrivals.',
  },
  {
    icon: BadgeCheck,
    title: 'Security-vetted chauffeurs',
    description:
      'Professionally screened, hospitality-trained drivers with high-stakes event and executive movement experience.',
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
    title: 'Top U.S. City Coverage',
    description:
      'Consistent concierge-level service in New York, Los Angeles, Miami, Chicago, San Francisco, Dallas, Houston, Washington DC, Boston, and Las Vegas.',
  },
  {
    icon: Clock3,
    title: 'Zero Latency',
    description:
      'Live dispatch with proactive routing and schedule monitoring so your vehicle arrives before your timeline requires.',
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

const cityCoverage = [
  'New York',
  'Los Angeles',
  'Miami',
  'Chicago',
  'San Francisco',
  'Dallas',
  'Houston',
  'Washington DC',
  'Boston',
  'Las Vegas',
];

const premiumFleet = [
  {
    name: 'Rolls-Royce Ghost Series II',
    type: 'Flagship Black Car',
    image:
      'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    name: 'Mercedes-Maybach S-Class',
    type: 'Executive Luxury Sedan',
    image:
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    name: 'Cadillac Escalade ESV',
    type: 'Security SUV',
    image:
      'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    name: 'BMW 7 Series',
    type: 'Executive Performance Sedan',
    image:
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1400',
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
        {/* HERO SECTION */}
        <section className="px-5 sm:px-6 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden border border-[#E6C992]/20 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div
              className="absolute inset-0 animate-subtle-zoom bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=2200')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071F1C]/95 via-[#071F1C]/72 to-[#071F1C]/88" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,201,146,0.16),transparent_40%)]" />

            <div className="relative grid min-h-[86vh] gap-10 p-7 sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-12">
              <div className="self-center">
                <p className="font-body text-[11px] uppercase tracking-[0.24em] text-[#F8F6F0]/82 animate-fade-in-up">
                  ESTABLISHED 2024 - PREMIUM U.S. GROUND CONCIERGE
                </p>

                <h1 className="mt-5 font-heading text-6xl font-light leading-[0.88] tracking-tight text-[#F8F6F0] md:text-7xl xl:text-[5.5rem]">
                  DISCREET
                  <span className="mt-1 block italic text-[#E6C992]">Black Car</span>
                  Mobility
                </h1>

                <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-[#F8F6F0]/86">
                  Built for high net worth individuals who value privacy, punctuality, and control. Concierge-caliber
                  chauffeured transportation across America&apos;s most important cities.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href="/auth/signup?type=rider">
                    <Button className="h-12 rounded-full bg-[#E6C992] px-8 font-body text-xs tracking-[0.16em] text-black hover:bg-[#F2DDB8]">
                      ARRANGE TRANSPORT
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href="/services"
                    className="border-b border-[#F8F6F0]/45 pb-1 font-body text-xs tracking-[0.16em] text-[#F8F6F0]/90 transition-colors hover:border-[#E6C992] hover:text-[#E6C992]"
                  >
                    EXPLORE SERVICES
                  </Link>
                </div>
              </div>

              <aside className="self-end border border-[#E6C992]/30 bg-black/38 p-6 backdrop-blur-sm">
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/95">
                  Top 10 U.S. Cities
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                  {cityCoverage.map((city) => (
                    <p key={city} className="font-body text-sm text-[#F8F6F0]/80">
                      {city}
                    </p>
                  ))}
                </div>
                <div className="mt-6 border-t border-[#E6C992]/20 pt-5">
                  <p className="font-body text-xs uppercase tracking-[0.16em] text-[#E6C992]/90">
                    24/7 Dispatch | Flight Tracking | Event Security Routing
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* TRUST PILLARS */}
        <section className="mt-12 px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl grid gap-5 md:grid-cols-3">
            {conciergePillars.map((pillar) => (
              <article key={pillar.title} className="border border-[#E6C992]/22 bg-[#0B2723]/62 p-6">
                <pillar.icon className="h-7 w-7 text-[#E6C992]" />
                <h2 className="mt-4 font-body text-2xl font-medium text-[#F8F6F0]">{pillar.title}</h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-[#F8F6F0]/75">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* VALUE PROPOSITION GRID */}
        <section className="mt-12 px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl border border-[#E6C992]/20 bg-[#0B2723]/75 p-8 sm:p-10">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">Value proposition</p>
                <h2 className="mt-2 font-heading text-5xl font-light leading-none">Why principals choose us</h2>
              </div>
              <Building2 className="hidden h-8 w-8 text-[#E6C992] sm:block" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {valueProps.map((prop) => (
                <article key={prop.title} className="border border-[#E6C992]/22 bg-black/22 p-6">
                  <prop.icon className="h-7 w-7 text-[#E6C992]" />
                  <h3 className="mt-4 font-body text-[1.7rem] font-medium leading-none text-[#F8F6F0]">{prop.title}</h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-[#F8F6F0]/74">{prop.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM FLEET */}
        <section className="mt-12 px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl border border-[#E6C992]/20 bg-[linear-gradient(125deg,rgba(7,31,28,0.96)_0%,rgba(11,38,34,0.95)_45%,rgba(19,53,47,0.92)_100%)] p-8 sm:p-10">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">Curated fleet</p>
                <h2 className="mt-2 font-heading text-5xl font-light leading-none">Premium black car standards</h2>
              </div>
              <Link href="/fleet" className="hidden sm:inline-flex">
                <Button variant="outline" className="border-[#E6C992]/70 bg-transparent text-[#E6C992] hover:bg-[#E6C992] hover:text-black">
                  VIEW FULL FLEET
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {premiumFleet.map((vehicle) => (
                <article key={vehicle.name} className="overflow-hidden border border-[#E6C992]/22 bg-black/20">
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105" style={{ backgroundImage: `url('${vehicle.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
                  </div>
                  <div className="p-5">
                    <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[#E6C992]/90">{vehicle.type}</p>
                    <h3 className="mt-2 font-body text-xl font-medium text-[#F8F6F0]">{vehicle.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENT EXPERIENCE */}
        <section className="mt-12 px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl border border-[#E6C992]/20 bg-[#0B2723]/75 p-8 sm:p-10">
            <div className="mb-8">
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">Client experience</p>
              <h2 className="mt-2 font-heading text-5xl font-light leading-none">Calm operations, exact execution</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
              <div className="grid gap-6 sm:grid-cols-2">
                {clientExperience.map((item) => (
                  <article key={item.title} className="border border-[#E6C992]/22 bg-black/20 p-5">
                    <item.icon className="h-7 w-7 text-[#E6C992]" />
                    <h3 className="mt-3 font-body text-[1.85rem] font-medium leading-none text-[#F8F6F0]">{item.title}</h3>
                    <p className="mt-4 font-body text-[1rem] leading-relaxed text-[#F8F6F0]/76">{item.description}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {heroFrames.map((frame) => (
                  <div key={frame.title} className="relative h-56 overflow-hidden border border-[#E6C992]/25">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${frame.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DUAL PATH SECTION */}
        <section className="mt-12 px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row gap-4 min-h-[560px]">
              <div className="flex-1 relative overflow-hidden group p-10 lg:p-12 flex flex-col justify-end border border-[#E6C992]/20">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062019] via-[#062019]/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-light mb-4 italic font-serif">The Client Experience</h3>
                  <p className="text-[#F8F6F0]/75 mb-8 max-w-sm font-light">Access our private fleet and dedicated U.S. concierge command team.</p>
                  <Link href="/auth/signup?type=rider">
                    <Button className="bg-[#F8F6F0] text-[#062019] hover:bg-[#E6C992] rounded-none px-8">RESERVE NOW</Button>
                  </Link>
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden group p-10 lg:p-12 flex flex-col justify-end border border-[#E6C992]/20">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5253123/pexels-photo-5253123.jpeg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062019] via-[#062019]/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-light mb-4 italic font-serif">The Chauffeur Network</h3>
                  <p className="text-[#F8F6F0]/75 mb-8 max-w-sm font-light">Join an elite circle of professional drivers serving UHNW clients.</p>
                  <Link href="/auth/signup?type=driver">
                    <Button variant="outline" className="border-[#F8F6F0] text-[#F8F6F0] hover:bg-[#F8F6F0] hover:text-[#062019] rounded-none px-8">APPLY TO DRIVE</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP CTA */}
        <section className="mt-12 px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl border border-[#E6C992]/20 bg-[#0B2723]/75 p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">Membership concierge</p>
                <h3 className="mt-4 font-heading text-5xl font-light leading-[1] md:text-6xl">
                  Begin your private mobility profile.
                </h3>
                <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-[#F8F6F0]/80">
                  Share your preferred cities, fleet profile, and travel cadence. Our concierge team builds a transport
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

      <style jsx global>{`
        @keyframes subtle-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 18s ease-in-out infinite alternate;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
