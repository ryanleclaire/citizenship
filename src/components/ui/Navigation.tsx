"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/eligibility", label: "Eligibility" },
  { href: "/family-tree", label: "Family Chain" },
  { href: "/checklist", label: "Checklist" },
  { href: "/guide", label: "Guide" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Resources" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  async function handleLogout() {
    console.log("LOG OUT CLICKED");
    try {
      await signOut();
      console.log("SIGN OUT COMPLETE");
    } catch (err) {
      console.error("SIGN OUT ERROR:", err);
    }
    window.location.href = "/";
  }

  return (
    <nav className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-lg font-bold tracking-tight">
            Citizenship Mountie
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
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`ml-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-red text-white"
                      : "bg-red/80 text-white hover:bg-red"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-1 px-3 py-2 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-red/80 text-white hover:bg-red transition-colors"
              >
                Log In
              </Link>
            )}
          </div>
          <MobileMenu pathname={pathname} user={user} onLogout={handleLogout} />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({
  pathname,
  user,
  onLogout,
}: {
  pathname: string;
  user: { id: string } | null;
  onLogout: () => void;
}) {
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
          <div className="border-t border-white/10 my-1" />
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/10"
              >
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/10"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="block px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/10"
            >
              Log In
            </Link>
          )}
        </div>
      </details>
    </div>
  );
}
