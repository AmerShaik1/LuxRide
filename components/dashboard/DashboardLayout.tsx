import { ReactNode } from 'react';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'rider' | 'driver';
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-emerald-900">
      <DashboardHeader userType={userType} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
