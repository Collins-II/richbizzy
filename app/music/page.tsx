"use client";

import { useState, useMemo, useRef, RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHero from "@/components/section_hero";
import AudioPlayer from "@/components/audio_player"; // ✅ your player card
import { albums } from "@/components/popular_albums";

// --- Album + Track Types ---
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


export default function MusicPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [search, setSearch] = useState("");
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Flatten all tracks across albums for search
  const allTracks = useMemo(
    () =>
      albums.flatMap(album =>
        album.tracks.map(track => ({
          ...track,
          album: album.title,
          cover: album.coverImage,
          artist: album.artist,
        }))
      ),
    []
  );

  // Filtered by album + search
  const filteredTracks = useMemo(() => {
    return allTracks.filter(track => {
      return (
        (!selectedAlbum || track.album === selectedAlbum.title) &&
        track.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [selectedAlbum, search, allTracks]);

  return (
    <section className="pb-20">
      <SectionHero subtitle="Explore albums and tracks from Rich Bizzy" />

      {/* Album Slider */}
      <div className="mx-auto grid max-w-7xl my-10 overflow-x-auto flex gap-6 cursor-grab snap-x snap-mandatory py-2">
        <motion.div className="flex gap-6" drag="x" dragConstraints={{ left: -500, right: 0 }} dragElastic={0.2}>
          {albums.map((album) => {
            const isSelected = selectedAlbum?.id === album.id;
            return (
              <motion.div
                key={album.id}
                className={`snap-start min-w-[200px] rounded-2xl overflow-hidden shadow-lg border-2 ${
                  isSelected ? "border-indigo-400" : "border-transparent"
                } cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedAlbum(isSelected ? null : album)}
              >
                <div className="relative h-48 w-48">
                  <Image src={album.coverImage} alt={album.title} fill className="object-cover" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-orange-500 font-bold">{album.title}</h3>
                  <p className="text-white/70 text-sm">{album.tracks.length} tracks</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by track title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black/50 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full max-w-md"
        />
      </div>

      {/* Songs Grid */}
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTracks.map(track => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <AudioPlayer
              ref={audioRef as RefObject<HTMLAudioElement>}
              playTrack={playTrack}
              currentTrackId={currentTrackId as number}
              isPlaying={isPlaying}
              track={{
                id: track.id,
                title: track.title,
                artist: track.artist,
                cover: track.cover,
                src: track.audioSrc,
                duration: Number(track.duration.split(":")[0]) * 60 + Number(track.duration.split(":")[1]), // convert mm:ss → seconds
              }}
            />
          </motion.div>
        ))}
        {filteredTracks.length === 0 && (
          <p className="text-center text-white/70 col-span-full">No tracks found.</p>
        )}
      </div>
    </section>
  );
}
