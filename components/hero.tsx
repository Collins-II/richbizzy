"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground">
      {/* Background spotlight gradient with image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/bizzy03.jpg"
          alt="Rich Bizzy"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto grid max-w-7xl min-h-screen grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2">
        
        {/* LEFT — Artist Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block mb-4 rounded-full bg-white/10 px-4 py-1 text-sm text-white/80 backdrop-blur-md">
            Zambia • Afro Pop • Dancehall Vibes
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
              Rich Bizzy
            </span>
            <span className="block mt-2 text-foreground">
              The Zambian Dancehall
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base md:text-lg text-muted-foreground">
            Discover the energy of Zambia’s Afro-Pop king. 
            From chart-topping singles to electrifying performances, 
            Rich Bizzy brings music that makes the world dance. 
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href={`/music`}>
              <Button className="rounded-xl bg-transparent hover:bg-indigo-700 text-white px-6 py-3 text-lg font-semibold shadow-lg shadow-yellow-600/30 flex items-center gap-2 hover:scale-105 transition-transform">
                <Play className="w-5 h-5" /> Listen Now
              </Button>
            </Link>

            <Link href={`/videos`}> 
              <Button
                variant="destructive"
                className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg shadow-white/30 flex items-center gap-2"
              >
                <FaYoutube size={24} /> Watch Videos
              </Button>
            </Link>

            <Link href={`/events`}> 
              <Button
                variant="outline"
                className="rounded-xl text-slate-900 hover:text-white bg-white hover:bg-slate-900 shadow-slate-800/30 px-6 py-3 text-lg flex items-center gap-2"
              >  
                <Calendar className="w-5 h-5" /> Upcoming Shows
              </Button>
            </Link>
          </div>
        </motion.div>

       {/* RIGHT — Featured Track / Player */}
       <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col items-center md:items-end"
        >
          {/* Album Art with hover animation */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0px 0px 30px rgba(250, 149, 34, 0.6)", // Green glow
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl shadow-yellow-600/40 border border-white/10 cursor-pointer"
          >
            <Image
              src="/assets/images/bizzy01.jpg"
              alt="Featured Album"
              fill
              className="object-cover"
            />
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>

          {/* Mini tagline below cover */}
          <p className="mt-4 text-sm text-white/70 italic">
            🎶 Latest Album: <span className="font-semibold">The Boss Is Back</span> 🎶
          </p>
        </motion.div>
      </div>
    </section>
  );
}
