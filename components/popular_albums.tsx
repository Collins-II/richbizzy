"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from "./audio_player";

interface Track {
  id: number;
  title: string;
  duration: string;
  audioSrc: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
  tracks: Track[];
}

export const albums: Album[] = [
  {
    id: 1,
    title: "The Boss Is Back",
    artist: "Rich Bizzy",
    coverImage: "/assets/images/bizzy07.jpg",
    tracks: [
      { id: 1, title: "The Boss Is Back", duration: "3:55", audioSrc: "/assets/audios/bossisback.mp3" },
      { id: 2, title: "Chibanyonge", duration: "4:20", audioSrc: "/assets/audios/chibanyonge.mp3" },
    ],
  },
  {
    id: 2,
    title: "Kangwa Na Lesa",
    artist: "Rich Bizzy",
    coverImage: "/assets/images/bizzy08.jpg",
    tracks: [
      { id: 3, title: "Biggie Bokosi ft Bloodkid Yvok", duration: "3:45", audioSrc: "/assets/audios/biggiebokosi.mp3" },
      { id: 4, title: "Bend Down", duration: "4:05", audioSrc: "/assets/audios/benddown.mp3" },
    ],
  },
  {
    id: 3,
    title: "Teamwork",
    artist: "Rich Bizzy",
    coverImage: "/assets/images/bizzy01.jpg",
    tracks: [
      { id: 5, title: "Tenga ft Kayz Adams", duration: "3:30", audioSrc: "/assets/audios/tenga.mp3" },
      { id: 6, title: "Chimwemwe Dance", duration: "4:10", audioSrc: "/assets/audios/chimwemwedance.mp3" },
    ],
  },
];

export default function PopularAlbums() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentAlbum = albums[currentIndex];
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playTrack = (trackId: number, src: string) => {
    if (audioRef.current) {
      if (currentTrackId === trackId && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = src;
        audioRef.current.play();
        setCurrentTrackId(trackId);
        setIsPlaying(true);
      }
    }
  };

  const playAlbum = () => {
    if (currentAlbum.tracks.length > 0) {
      const firstTrack = currentAlbum.tracks[0];
      playTrack(firstTrack.id, firstTrack.audioSrc);
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audioEl?.addEventListener("ended", handleEnded);
    return () => audioEl?.removeEventListener("ended", handleEnded);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? albums.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === albums.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="mx-auto max-w-6xl py-20 overflow-x-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold bg-yellow-400 bg-clip-text text-transparent">
          Popular Albums
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto italic">
          Groove to Rich Bizzy’s biggest hits — pure Afro-Pop & Dancehall fire.
        </p>
      </div>

      {/* Main Album Player */}
      <div className="relative flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-6">
        <motion.div
          key={currentAlbum.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.05,
            rotate: 1,
            boxShadow: "0px 0px 30px rgba(251, 146, 60, 0.6)", // orange glow
          }}
          className="relative w-full lg:w-1/3 h-[300px] sm:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-orange-500/40"
        >
          <Image
            src={currentAlbum.coverImage}
            alt={currentAlbum.title}
            fill
            className="object-cover object-center rounded-3xl"
          />
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />

          {/* Navigation */}
          <button
            aria-label="nav-buttons"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/70 p-2 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            aria-label="nav-buttons"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/70 p-2 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>

        {/* Album Details */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          <h3 className="text-2xl sm:text-3xl font-bold bg-white bg-clip-text text-transparent">
            {currentAlbum.title}
          </h3>
          <p className="text-orange-300 font-semibold">{currentAlbum.artist}</p>

          {/* Tracks */}
          <div className="space-y-2">
            {currentAlbum.tracks.map((track) => (
              <AudioPlayer
                key={track.id}
                ref={audioRef as RefObject<HTMLAudioElement>}
                playTrack={playTrack}
                currentTrackId={currentTrackId as number}
                isPlaying={isPlaying}
                track={{
                  id: track.id,
                  title: track.title,
                  artist: "Rich Bizzy",
                  src: track.audioSrc,
                  duration:
                    Number(track.duration.split(":")[0]) * 60 +
                    Number(track.duration.split(":")[1]),
                }}
              />
            ))}
          </div>

          {/* Play Album Button */}
          <Button
            onClick={playAlbum}
            className="mt-4 w-max rounded-xl bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2"
          >
            Play Album
          </Button>
        </div>
      </div>

  {/* Thumbnail Album Slider */}
<div className="mt-12 flex gap-4 overflow-x-auto scrollbar-hide py-4 px-6">
  {albums.map((album, idx) => (
    <motion.div
      key={album.id}
      onClick={() => setCurrentIndex(idx)}
      className={`relative flex-shrink-0 w-36 h-36 sm:w-36 sm:h-36 rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform ${
        idx === currentIndex
          ? "scale-110 border-4 border-yellow-400"
          : "hover:scale-105"
      }`}
      whileHover={{ scale: 1.08 }}
    >
      <Image
        src={album.coverImage}
        alt={album.title}
        fill
        className="object-cover object-center"
      />

      {/* Animated Overlay for Current Album */}
      {idx === currentIndex && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Glowing Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-4 border-yellow-500"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: [0.6, 0.2, 0.6], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          {/* Animated Music Bars */}
          <div className="flex gap-1 absolute bottom-2">
            {[1, 2, 3, 4].map((bar) => (
              <motion.span
                key={bar}
                className="w-1 bg-yellow-400 rounded"
                initial={{ height: 4 }}
                animate={{
                  height: [8, 20, 12, 18, 10][bar % 5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  repeatType: "reverse",
                  delay: bar * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
        ))}
      </div>
    </section>
  );
}
