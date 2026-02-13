'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-900/95 backdrop-blur-md border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Shield className="w-6 h-6 text-gold-400 group-hover:text-gold-300 transition-colors" />
            <span className="text-xl font-light tracking-[0.2em] text-ivory font-heading">
              AURELLO
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 ml-16">
            <Link
              href="/"
              className="text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body"
            >
              HOME
            </Link>
            <Link
              href="/services"
              className="text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body"
            >
              SERVICES
            </Link>
            <Link
              href="/fleet"
              className="text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body"
            >
              FLEET
            </Link>
            <Link
              href="/offers"
              className="text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body"
            >
              OFFERS
            </Link>
            <Link
              href="/tours"
              className="text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body"
            >
              TOURS
            </Link>
            <Link
              href="/about"
              className="text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body"
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body"
            >
              CONTACT
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-ivory hover:bg-gold-400/10 hover:text-gold-400 font-light tracking-wide font-body"
                >
                  LOGIN
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-emerald-800 border-gold-400/20">
                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/login?mode=rider"
                    className="text-ivory hover:text-gold-400 cursor-pointer font-body"
                  >
                    Rider Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/login?mode=driver"
                    className="text-ivory hover:text-gold-400 cursor-pointer font-body"
                  >
                    Chauffeur Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/auth/signup">
              <Button className="bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide px-8 font-body transition-all duration-300">
                RESERVE
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden text-ivory"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-900 border-t border-gold-400/20">
          <div className="px-6 py-6 space-y-4">
            <Link
              href="/"
              className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/services"
              className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              SERVICES
            </Link>
            <Link
              href="/fleet"
              className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FLEET
            </Link>
            <Link
              href="/offers"
              className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              OFFERS
            </Link>
            <Link
              href="/tours"
              className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              TOURS
            </Link>
            <Link
              href="/about"
              className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors tracking-wide font-body py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>

            <div className="pt-4 space-y-3 border-t border-gold-400/20">
              <Link
                href="/auth/login?mode=rider"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full text-ivory hover:bg-gold-400/10 hover:text-gold-400 font-light tracking-wide font-body"
                >
                  RIDER LOGIN
                </Button>
              </Link>
              <Link
                href="/auth/login?mode=driver"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full text-ivory hover:bg-gold-400/10 hover:text-gold-400 font-light tracking-wide font-body"
                >
                  CHAUFFEUR LOGIN
                </Button>
              </Link>
              <Link
                href="/auth/signup"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-gold-400 hover:bg-gold-300 text-emerald-900 font-light tracking-wide font-body">
                  RESERVE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
