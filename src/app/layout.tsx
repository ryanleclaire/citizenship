import type { Metadata } from "next";
import { Lora, DM_Sans } from "next/font/google";
import Navigation from "@/components/ui/Navigation";
import Disclaimer from "@/components/ui/Disclaimer";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Citizenship Mountie | Canadian Citizenship Under Bill C-3",
  description:
    "A step-by-step guide to applying for a Canadian citizenship certificate under Bill C-3 (2025). Check your eligibility, build your document checklist, and navigate the application process.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${dmSans.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-navy text-white/60 py-8">
            <div className="max-w-6xl mx-auto px-4 space-y-4">
              <Disclaimer />
              <div className="flex justify-center gap-4 text-xs">
                <a href="/about" className="hover:text-white transition-colors">About Us</a>
                <span className="text-white/30">|</span>
                <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                <span className="text-white/30">|</span>
                <a href="/resources" className="hover:text-white transition-colors">Resources</a>
                <span className="text-white/30">|</span>
                <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
              </div>
              <p className="text-center text-xs">
                &copy; {new Date().getFullYear()} Citizenship Mountie. Not affiliated with the Government of Canada.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
