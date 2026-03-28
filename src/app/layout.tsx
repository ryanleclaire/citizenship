import type { Metadata } from "next";
import { Lora, DM_Sans } from "next/font/google";
import Navigation from "@/components/ui/Navigation";
import Disclaimer from "@/components/ui/Disclaimer";
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
  title: "Bill C-3 Citizenship Guide | Canadian Citizenship by Descent",
  description:
    "A step-by-step guide to applying for a Canadian citizenship certificate under Bill C-3 (2025). Check your eligibility, build your document checklist, and navigate the application process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${dmSans.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-navy text-white/60 py-8">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <Disclaimer />
            <p className="text-center text-xs">
              &copy; {new Date().getFullYear()} Bill C-3 Citizenship Guide. Not affiliated with the Government of Canada.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
