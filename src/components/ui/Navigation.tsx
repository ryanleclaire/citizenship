"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/eligibility", label: "Eligibility" },
  { href: "/checklist", label: "Checklist" },
  { href: "/guide", label: "Guide" },
  { href: "/cover-letter", label: "Cover Letter" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Resources" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Citizenship Mountie"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="font-serif text-lg font-bold tracking-tight hidden sm:inline">
              Citizenship Mountie
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 bg-navy-700 rounded-lg shadow-xl py-2 z-50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 text-sm ${
                pathname === item.href
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
