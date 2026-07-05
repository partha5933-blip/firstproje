"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Camera,
  FileImage,
  Gauge,
  Images,
  LogOut,
  Mail,
  MessageSquareQuote,
  Settings,
  ShieldCheck,
  Users,
  WalletCards
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Gauge },
  { label: "Leads", href: "/admin/leads", icon: WalletCards },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Emails", href: "/admin/emails", icon: Mail },
  { label: "Services", href: "/admin/services", icon: Camera },
  { label: "Portfolio", href: "/admin/portfolio", icon: Images },
  { label: "Media", href: "/admin/media", icon: FileImage },
  { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "GDPR", href: "/admin/gdpr", icon: ShieldCheck }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-white/10 bg-[#080808] lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="flex h-[72px] items-center gap-3 border-b border-white/10 px-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/35">
            <Camera className="h-5 w-5 text-gold" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Lux Lens CRM</p>
            <p className="text-xs text-muted">Admin workspace</p>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 py-4 lg:grid lg:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 shrink-0 items-center gap-3 rounded-md px-3 text-sm transition",
                  active ? "bg-gold text-black" : "text-muted hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto hidden border-t border-white/10 p-4 lg:block">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm text-muted transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
