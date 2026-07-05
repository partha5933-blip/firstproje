import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-background">
      <AdminSidebar />
      <div className="lg:pl-72">
        <header className="hidden h-[72px] items-center justify-between border-b border-white/10 bg-background/90 px-8 backdrop-blur lg:flex">
          <div>
            <p className="text-sm font-medium text-white">Studio operations</p>
            <p className="text-xs text-muted">Leads, content, email, appointments, consent, and analytics.</p>
          </div>
          <a
            href="/"
            className="rounded-md border border-white/15 px-3 py-2 text-sm text-muted transition hover:border-gold/70 hover:text-white"
          >
            View Site
          </a>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
