import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NextTopLoader from "nextjs-toploader";
import ReduxProvider from "@/lib/provider/redux_provider";
import Footer from "@/components/footer";
import GlobalAudioPlayer from "@/components/global_audio_player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rich Bizzy | Afro Pop | Dancehall",
  icons: {
    icon: "/assets/images/bizzy01.jpg",
  },
  description:
    "Official website of Rich Bizzy — Zambia’s celebrated Dancehall and Afro-fusion artist. Music, videos, tours, and exclusive content.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-[#0a0a0f] via-[#120c1b] to-[#000] text-white`}
      >
        {/* Top loader */}
        <NextTopLoader color="#facc15" showSpinner={false} />

        {/* Global Providers */}
        <ReduxProvider>
          <div className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Decorative Backgrounds */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Global Audio Player (floating bottom control) */}
            <GlobalAudioPlayer />

            {/* Footer */}
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
