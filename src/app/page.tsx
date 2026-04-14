
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TEAMS } from '@/lib/auction-data';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const bgImage = PlaceHolderImages.find(img => img.id === 'ucl_bg');

  // Loop through teams every 3 seconds during intro
  useEffect(() => {
    if (showIntro) {
      const interval = setInterval(() => {
        setActiveTeamIndex((prev) => (prev + 1) % TEAMS.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showIntro]);

  const handleEnter = () => {
    setShowIntro(false);
  };

  // Intro Sequence Screen
  if (showIntro) {
    const currentTeam = TEAMS[activeTeamIndex];
    return (
      <div className="relative h-screen w-full flex flex-col items-center justify-center bg-[#000411] text-white overflow-hidden font-body">
        {/* Background with Stadium */}
        {bgImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={bgImage.imageUrl} 
              alt="UCL Stadium" 
              fill 
              className="object-cover opacity-20 brightness-50" 
              priority
              data-ai-hint={bgImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000411] via-transparent to-[#000411]" />
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl">
          <div className="flex items-center gap-4 mb-12 animate-pulse">
            <Trophy className="w-10 h-10 text-secondary" />
            <div className="flex flex-col items-start text-left">
               <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Welfare DIIA Presents</span>
               <span className="text-lg font-black tracking-[0.2em] text-white uppercase">WPL AUCTION 2024</span>
            </div>
          </div>

          <div key={currentTeam.id} className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
             <div className="w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-3xl rounded-full p-12 border-4 border-primary/20 shadow-[0_0_100px_rgba(0,212,255,0.2)] mb-8 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5" />
                <img 
                  src={currentTeam.logoUrl} 
                  alt={currentTeam.name} 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" 
                />
             </div>
             <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               {currentTeam.name}
             </h2>
             <div className="h-1 w-32 bg-primary mt-6 rounded-full shadow-[0_0_15px_rgba(0,212,255,1)]" />
          </div>

          <div className="mt-20 flex flex-col items-center gap-6">
            <Button 
              onClick={handleEnter}
              className="h-16 px-12 text-sm font-black uppercase tracking-[0.3em] rounded-2xl bg-white text-black hover:bg-primary hover:text-white transition-all group shadow-2xl"
            >
              Skip Intro
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex gap-3">
              {TEAMS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-700",
                    activeTeamIndex === i ? "bg-primary w-10 shadow-[0_0_8px_rgba(0,212,255,0.8)]" : "bg-white/20"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.8em] opacity-30 whitespace-nowrap">
           PROCEED TO AUCTION SYSTEM • WELFARE DIIA • 2024
        </div>
      </div>
    );
  }

  // Main Landing Content
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-[#000411] text-white overflow-hidden font-body">
      
      {/* Background with Stadium */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgImage.imageUrl} 
            alt="UCL Stadium" 
            fill 
            className="object-cover opacity-40 brightness-75" 
            priority
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000411] via-transparent to-[#000411]/60" />
          <div className="absolute inset-0 ucl-gradient opacity-40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <Trophy className="w-14 h-14 text-secondary drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
          <div className="flex flex-col items-start text-left">
             <span className="text-sm font-black tracking-[0.4em] text-primary uppercase leading-none">Welfare</span>
             <span className="text-sm font-black tracking-[0.4em] text-white uppercase leading-none mt-1.5 opacity-50">DIIA Presents</span>
          </div>
        </div>

        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8 animate-in fade-in zoom-in-95 duration-1000">
          WPL<br />
          <span className="text-primary drop-shadow-[0_0_30px_rgba(0,212,255,0.4)]">AUCTION</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-[0.2em] font-medium mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          The ultimate football auction is here — 6 teams, 60 players, one battle. Presented by Welfare DIIA.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <Link href="/draft">
            <Button className="h-20 px-12 text-xl font-black uppercase tracking-[0.2em] rounded-2xl bg-primary text-black hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_50px_rgba(0,212,255,0.3)] group">
              <Play className="w-6 h-6 mr-4 fill-current group-hover:scale-110 transition-transform" />
              Start Auction
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute top-1/2 -right-24 -translate-y-1/2 rotate-90 text-[10rem] font-black text-white/[0.02] select-none tracking-tighter uppercase whitespace-nowrap">
        LEAGUE CHAMPIONS 2024
      </div>
    </div>
  );
}
