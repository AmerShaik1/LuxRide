import Link from 'next/link';
import { Shield, Phone, Mail, Clock } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-gold-400/20 py-16 px-8 bg-emerald-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-gold-400" />
            <span className="text-xl font-light tracking-[0.2em] text-ivory font-heading">
              AURELLO
            </span>
          </div>
          <p className="text-sm text-ivory/60 font-light tracking-wide font-body">
            Extraordinary journeys for extraordinary lives
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-ivory/60">
          <Link
            href="/services"
            className="hover:text-gold-400 transition-colors tracking-wide font-body"
          >
            Services
          </Link>
          <Link
            href="/fleet"
            className="hover:text-gold-400 transition-colors tracking-wide font-body"
          >
            Fleet
          </Link>
          <Link
            href="/offers"
            className="hover:text-gold-400 transition-colors tracking-wide font-body"
          >
            Offers
          </Link>
          <Link
            href="/tours"
            className="hover:text-gold-400 transition-colors tracking-wide font-body"
          >
            Tours
          </Link>
          <Link
            href="/about"
            className="hover:text-gold-400 transition-colors tracking-wide font-body"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gold-400 transition-colors tracking-wide font-body"
          >
            Contact
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12 pt-8 border-t border-gold-400/20">
          <div className="flex items-center justify-center gap-3">
            <Phone className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-ivory/60 font-body">+1 (555) 000-0000</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Mail className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-ivory/60 font-body">
              concierge@aurello.com
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-ivory/60 font-body">24/7 Availability</span>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gold-400/20">
          <p className="text-xs text-ivory/40 tracking-wider font-body">
            &copy; 2024 Aurello. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
