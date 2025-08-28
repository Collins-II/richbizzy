"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHero from "@/components/section_hero";
import VideoCard from "@/components/videocard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Video {
  id: string;
  title: string;
  category: string;
  date: string;
}

// Example Rich Bizzy video IDs – replace with actual YouTube IDs
const BOSSISBACK = "vdddgX33E-8";
const INAMA = "e8F2hQka3rw";
const FALLING = "Ll4Iqe2N5M4";
const STUDIO = "EO7P7tsigKQ";
const ENJOY = "r_ZpHCg0ePA";
const LIVE_SHOWKMP = "Ns9BhJm2wUg";
const BTSFALLING = "NBD11NoTjZY";

const youtubeVideos: Video[] = [
  {
    id: BOSSISBACK,
    title: "The Boss Is Back",
    category: "Music Video",
    date: "2024-11-10",
  },
  {
    id: STUDIO,
    title: "Live In Studio (Live)",
    category: "Live Performance",
    date: "2025-01-22",
  },
  {
    id: INAMA,
    title: "Inama (Official Video)",
    category: "Music Video",
    date: "2024-12-15",
  },
  {
    id: ENJOY,
    title: "Enjoyment",
    category: "Music Video",
    date: "2025-02-05",
  },
  {
    id: FALLING,
    title: "Falling ft Bontle Smith",
    category: "Music Video",
    date: "2025-03-12",
  },
  {
    id: LIVE_SHOWKMP,
    title: "Rich Bizzy – KMP Launch Live in Lusaka",
    category: "Live Performance",
    date: "2025-04-09",
  },
  {
    id: BTSFALLING,
    title: "Behind the Scenes – Studio Vibes",
    category: "Behind The Scene",
    date: "2025-04-20",
  },
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => Array.from(new Set(youtubeVideos.map((v) => v.category))),
    []
  );

  const filteredVideos = useMemo(
    () =>
      youtubeVideos.filter(
        (video) => !selectedCategory || video.category === selectedCategory
      ),
    [selectedCategory]
  );

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <section className="pb-20">
      <SectionHero subtitle="Official Rich Bizzy music videos, live performances, and behind-the-scenes exclusives" />

      {/* Featured Video Slider */}
      <div className="relative mb-12">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 px-4"
        >
          {youtubeVideos.slice(0, 3).map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05 }}
              className="snap-center w-[340px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg bg-black/40"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                className="w-full h-60"
                allowFullScreen
              />
              <div className="p-4">
                <h3 className="text-orange-500 font-bold text-lg">{video.title}</h3>
                <p className="text-white/70 text-sm">{video.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
            aria-label="nav-buttons"
            onClick={scrollLeft}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/70 p-2 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            aria-label="nav-buttons"
            onClick={scrollRight}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/70 p-2 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-4 my-10">
        <Button
          className={`rounded-full ${
            !selectedCategory
              ? "bg-orange-500 hover:bg-orange-400 text-white"
              : "bg-white/10 hover:bg-orange-400 text-white"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            className={`rounded-full ${
              selectedCategory === category
                ? "bg-orange-500 hover:bg-orange-400 text-white"
                : "bg-white/10 hover:bg-orange-400 text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {filteredVideos.map((video) => (
          <VideoCard video={video} key={video.id} />
        ))}

        {filteredVideos.length === 0 && (
          <p className="text-center text-white/70 col-span-full">
            No videos found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
