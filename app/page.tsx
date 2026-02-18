'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Car, Clock, Globe, Mail, Phone, Shield, Star, Zap } from 'lucide-react';

import { useAuth } from '@/lib/auth/context';
import { Button } from '@/components/ui/button';

const heroMetrics = [
  { value: '40+', label: 'Global hubs' },
  { value: '99.98%', label: 'On-time precision' },
  { value: '<90s', label: 'Concierge response' },
  { value: '24/7', label: 'Command center' },
];

const signatureStandards = [
  {
    icon: Shield,
    title: 'Total discretion',
    description:
      'Every journey is managed with strict confidentiality protocols for high-profile travel.',
  },
  {
    icon: Globe,
    title: 'Intercity continuity',
    description:
      'Flight manifests, private terminals, and city handovers are synchronized by one team.',
  },
  {
    icon: Zap,
    title: 'Zero-latency execution',
    description:
      'Proactive routing and live chauffeur orchestration ensure a seamless timeline.',
  },
];

const valueProps = [
  {
    icon: Shield,
    title: 'Security by design',
    description:
      'Background-vetted chauffeurs, encrypted guest notes, and tightly controlled dispatch workflows.',
  },
  {
    icon: Car,
    title: 'Black-car standards',
    description:
      'Flagship sedans maintained to showroom condition with climate-prepared cabins.',
  },
  {
    icon: Clock,
    title: 'Punctuality as protocol',
    description:
      'Arrival windows are engineered around your agenda, not generic pickup slots.',
  },
];

const testimonials = [
  {
    quote:
      'APEX delivers the same confidence every time: silent precision, discreet people, and immaculate vehicles.',
    name: 'A. Wellington',
    role: 'Family Office Director',
  },
  {
    quote:
      'The only service we trust for board movements and diplomatic guests across multiple cities.',
    name: 'M. Laurent',
    role: 'Chief of Staff, Global Group',
  },
  {
    quote:
      'Operationally flawless. They execute like a private aviation crew, but on the ground.',
    name: 'S. Ibrahim',
    role: 'Private Client',
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
    <div className="min-h-screen bg-[#0F2E2B] text-[#F8F6F0] selection:bg-[#E6C992]/30">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#E6C992]/20 bg-black/35 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6C992]/50 bg-black/30">
              <Shield className="h-4 w-4 text-[#E6C992]" />
            </span>
            <span className="font-heading text-3xl font-light tracking-wide text-[#F8F6F0]">APEX</span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <Link
              href="/services"
              className="font-body text-xs tracking-[0.18em] text-[#F8F6F0]/85 transition-colors hover:text-[#E6C992]"
            >
              SERVICES
            </Link>
            <Link
              href="/fleet"
              className="font-body text-xs tracking-[0.18em] text-[#F8F6F0]/85 transition-colors hover:text-[#E6C992]"
            >
              FLEET
            </Link>
            <Link
              href="/about"
              className="font-body text-xs tracking-[0.18em] text-[#F8F6F0]/85 transition-colors hover:text-[#E6C992]"
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="font-body text-xs tracking-[0.18em] text-[#F8F6F0]/85 transition-colors hover:text-[#E6C992]"
            >
              CONTACT
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="font-body text-xs tracking-[0.16em] text-[#F8F6F0] hover:bg-[#E6C992]/10 hover:text-[#F8F6F0]"
              >
                LOGIN
              </Button>
            </Link>
            <Link href="/auth/signup?type=rider">
              <Button className="h-11 rounded-full bg-[#E6C992] px-6 font-body text-xs tracking-[0.16em] text-black hover:bg-[#F2DDB8]">
                RESERVE
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden border-b border-[#E6C992]/20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-subtle-zoom"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=2200')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-[#0F2E2B]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(230,201,146,0.18),transparent_38%)]" />

          <div className="relative mx-auto flex min-h-[96vh] max-w-7xl flex-col justify-center px-6 pb-16 pt-28 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="mb-8 font-body text-[11px] uppercase tracking-[0.24em] text-[#F8F6F0]/75">
                  Established 2024 - Global Concierge
                </p>

                <h1 className="font-heading text-6xl font-light leading-[0.9] tracking-tight md:text-7xl xl:text-8xl">
                  DISCREET
                  <br />
                  <span className="italic text-[#E6C992]">Black Car</span>
                  <br />
                  Mobility
                </h1>

                <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-[#F8F6F0]/80">
                  A 2026 luxury transport standard inspired by Rolls-Royce restraint: silent cabins, exact timing,
                  and flawless door-to-door execution.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href="/auth/signup?type=rider">
                    <Button className="h-12 rounded-full bg-[#E6C992] px-8 font-body text-xs tracking-[0.16em] text-black hover:bg-[#F2DDB8]">
                      ARRANGE TRANSPORT
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href="/fleet"
                    className="border-b border-[#F8F6F0]/40 pb-1 font-body text-xs tracking-[0.16em] text-[#F8F6F0]/90 transition-colors hover:border-[#E6C992] hover:text-[#E6C992]"
                  >
                    VIEW CURATED FLEET
                  </Link>
                </div>
              </div>

              <aside className="rounded-sm border border-[#E6C992]/30 bg-black/40 p-6 backdrop-blur-sm">
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">Black Badge Dispatch</p>
                <h2 className="mt-4 font-heading text-3xl font-light leading-tight">
                  Executive-class readiness in minutes, not hours.
                </h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-[#F8F6F0]/75">
                  Dedicated routing, preconditioned cabins, and concierge-level coordination for airport, boardroom,
                  and private residence transfers.
                </p>
                <div className="mt-6 space-y-3 border-t border-[#E6C992]/20 pt-6">
                  {[
                    ['London', 'Available now'],
                    ['Paris', '11 min dispatch'],
                    ['New York', '14 min dispatch'],
                  ].map(([city, status]) => (
                    <div key={city} className="flex items-center justify-between">
                      <span className="font-body text-sm text-[#F8F6F0]/80">{city}</span>
                      <span className="font-body text-xs uppercase tracking-[0.16em] text-[#E6C992]/90">{status}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="border border-[#E6C992]/20 bg-black/35 px-5 py-4 backdrop-blur-sm">
                  <p className="font-heading text-3xl font-light text-[#E6C992]">{metric.value}</p>
                  <p className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-[#F8F6F0]/70">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0F2E2B] px-6 py-28 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="relative min-h-[540px] overflow-hidden border border-[#E6C992]/25">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">Cabin Atmosphere</p>
                <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-[#F8F6F0]/80">
                  Hand-finished interiors, whisper-quiet ride quality, and subtle ambient environments designed for
                  focused travel.
                </p>
              </div>
            </div>

            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[#E6C992]/90">Signature standards</p>
              <h2 className="mt-5 font-heading text-5xl font-light leading-[1.02] md:text-6xl">
                Luxury that feels effortless because every detail is engineered.
              </h2>
              <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-[#F8F6F0]/80">
                Our operating model combines premium hospitality with precision logistics, producing a calm, consistent
                experience for principals, teams, and guests.
              </p>

              <div className="mt-10 space-y-4">
                {signatureStandards.map((standard) => (
                  <div key={standard.title} className="flex gap-4 border border-[#E6C992]/20 bg-[#143731]/40 p-5">
                    <standard.icon className="mt-1 h-5 w-5 shrink-0 text-[#E6C992]" />
                    <div>
                      <h3 className="font-heading text-2xl font-light text-[#F8F6F0]">{standard.title}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-[#F8F6F0]/75">{standard.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E6C992]/20 bg-[#143731] px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[#E6C992]/90">Value proposition grid</p>
              <h2 className="mt-4 font-heading text-5xl font-light md:text-6xl">Power with poise</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {valueProps.map((prop) => (
                <article
                  key={prop.title}
                  className="group border border-[#E6C992]/25 bg-[#0F2E2B]/45 p-7 transition-colors hover:border-[#E6C992]/55"
                >
                  <prop.icon className="h-7 w-7 text-[#E6C992]" />
                  <h3 className="mt-6 font-heading text-3xl font-light">{prop.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-[#F8F6F0]/75">{prop.description}</p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-[#E6C992]/45 to-transparent" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0F2E2B] px-6 py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[#E6C992]/90">Dual experience</p>
              <h2 className="mt-4 font-heading text-5xl font-light md:text-6xl">Two pathways, one standard</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="group relative min-h-[460px] overflow-hidden border border-[#E6C992]/20">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-8">
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">For clients</p>
                  <h3 className="mt-3 font-heading text-4xl font-light">Reserve elite transport</h3>
                  <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#F8F6F0]/80">
                    Secure private black-car coverage for executives, families, and diplomatic guests.
                  </p>
                  <Link href="/auth/signup?type=rider" className="mt-7 inline-flex w-fit">
                    <Button className="h-11 rounded-full bg-[#E6C992] px-6 font-body text-xs tracking-[0.16em] text-black hover:bg-[#F2DDB8]">
                      START MEMBERSHIP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </article>

              <article className="group relative min-h-[460px] overflow-hidden border border-[#E6C992]/20">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/5253123/pexels-photo-5253123.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-8">
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E6C992]/90">For chauffeurs</p>
                  <h3 className="mt-3 font-heading text-4xl font-light">Join the driver circle</h3>
                  <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#F8F6F0]/80">
                    Work with discerning clientele through a dispatch model built on punctuality and etiquette.
                  </p>
                  <Link href="/auth/signup?type=driver" className="mt-7 inline-flex w-fit">
                    <Button
                      variant="outline"
                      className="h-11 rounded-full border-[#E6C992]/70 bg-black/10 px-6 font-body text-xs tracking-[0.16em] text-[#E6C992] hover:bg-[#E6C992] hover:text-black"
                    >
                      APPLY TO DRIVE
                    </Button>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E6C992]/20 bg-[#143731] px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[#E6C992]/90">Client perspective</p>
              <h2 className="mt-4 font-heading text-5xl font-light md:text-6xl">Trusted by quiet leaders</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((item) => (
                <article key={item.name} className="border border-[#E6C992]/25 bg-[#0F2E2B]/45 p-7">
                  <div className="mb-5 flex items-center gap-1 text-[#E6C992]">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-body text-sm leading-relaxed text-[#F8F6F0]/80">&quot;{item.quote}&quot;</p>
                  <div className="mt-7 border-t border-[#E6C992]/20 pt-5">
                    <p className="font-body text-xs tracking-[0.16em] text-[#E6C992]">{item.name}</p>
                    <p className="mt-1 font-body text-xs text-[#F8F6F0]/65">{item.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1A4942] px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[#E6C992]/90">Membership intake</p>
            <h2 className="mt-4 font-heading text-5xl font-light md:text-6xl">Begin with a private consultation</h2>
            <p className="mx-auto mt-6 max-w-3xl font-body text-lg leading-relaxed text-[#F8F6F0]/85">
              Tell us your travel profile, preferred vehicle class, and service cities. Our concierge team will
              configure your account and priority routing.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signup?type=rider">
                <Button className="h-12 rounded-full bg-[#E6C992] px-8 font-body text-xs tracking-[0.16em] text-black hover:bg-[#F2DDB8]">
                  RESERVE MEMBERSHIP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-[#E6C992]/70 bg-black/10 px-8 font-body text-xs tracking-[0.16em] text-[#E6C992] hover:bg-[#E6C992] hover:text-black"
                >
                  CONTACT CONCIERGE
                </Button>
              </Link>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl gap-5 border-t border-[#E6C992]/20 pt-10 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-[#E6C992]" />
                <span className="font-body text-sm text-[#F8F6F0]/80">+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-[#E6C992]" />
                <span className="font-body text-sm text-[#F8F6F0]/80">concierge@apex.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-[#E6C992]" />
                <span className="font-body text-sm text-[#F8F6F0]/80">24/7 Availability</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E6C992]/20 bg-[#0F2E2B] px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6C992]/40">
                  <Shield className="h-4 w-4 text-[#E6C992]" />
                </span>
                <span className="font-heading text-3xl font-light tracking-wide">APEX</span>
              </div>
              <p className="mt-4 font-body text-sm text-[#F8F6F0]/65">Extraordinary journeys for extraordinary lives.</p>
            </div>

            <div className="grid gap-2 text-center md:text-right">
              <p className="font-body text-xs tracking-[0.16em] text-[#E6C992]">LONDON | PARIS | NEW YORK</p>
              <p className="font-body text-xs text-[#F8F6F0]/55">&copy; 2026 APEX. All Rights Reserved.</p>
            </div>
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
      `}</style>
    </div>
  );
}
