'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  userType: 'rider' | 'driver';
}

export function DashboardHeader({ userType }: DashboardHeaderProps) {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardPath = userType === 'rider' ? '/rider' : '/driver';
  const dashboardLabel = userType === 'rider' ? 'Rider' : 'Chauffeur';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-900/95 backdrop-blur-md border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <Link href={dashboardPath} className="flex items-center gap-3 group">
            <Shield className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
            <span className="text-lg font-light tracking-[0.2em] text-ivory font-heading">
              AURELLO
            </span>
            <span className="text-xs text-ivory/50 font-body ml-2">
              {dashboardLabel}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {userType === 'rider' && (
              <>
                <Link
                  href="/rider"
                  className="text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body"
                >
                  Dashboard
                </Link>
                <Link
                  href="/rider/book"
                  className="text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body"
                >
                  Book Ride
                </Link>
                <Link
                  href="/rider/trips"
                  className="text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body"
                >
                  My Trips
                </Link>
                <Link
                  href="/rider/profile"
                  className="text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body"
                >
                  Profile
                </Link>
              </>
            )}

            {userType === 'driver' && (
              <>
                <Link
                  href="/driver"
                  className="text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body"
                >
                  Dashboard
                </Link>
                <Link
                  href="/driver/rides"
                  className="text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body"
                >
                  Rides
                </Link>
                <Link
                  href="/driver/earnings"
                  className="text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body"
                >
                  Earnings
                </Link>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-ivory hover:bg-gold-400/10 hover:text-gold-400"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-emerald-800 border-gold-400/20">
                <DropdownMenuItem className="text-ivory/70 focus:text-gold-400">
                  <span className="text-xs">{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gold-400/20" />
                <DropdownMenuItem
                  onClick={signOut}
                  className="text-ivory hover:text-gold-400 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            className="md:hidden text-ivory"
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
        <div className="md:hidden bg-emerald-900 border-t border-gold-400/20">
          <div className="px-6 py-6 space-y-4">
            {userType === 'rider' && (
              <>
                <Link
                  href="/rider"
                  className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/rider/book"
                  className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Ride
                </Link>
                <Link
                  href="/rider/trips"
                  className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Trips
                </Link>
                <Link
                  href="/rider/profile"
                  className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}

            {userType === 'driver' && (
              <>
                <Link
                  href="/driver"
                  className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/driver/rides"
                  className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rides
                </Link>
                <Link
                  href="/driver/earnings"
                  className="block text-sm text-ivory/80 hover:text-gold-400 transition-colors font-body py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Earnings
                </Link>
              </>
            )}

            <div className="pt-4 border-t border-gold-400/20">
              <div className="text-xs text-ivory/50 mb-2 font-body">
                {user?.email}
              </div>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                variant="ghost"
                className="w-full justify-start text-ivory hover:bg-gold-400/10 hover:text-gold-400 font-body"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
