
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Play, ChevronRight, Star, Zap, Hexagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TEAMS } from '@/lib/auction-data';
import { cn } from '@/lib/utils';

const HEADER_TRANSITIONS = [
  "animate-in fade-in slide-in-from-left-20 duration-1000 ease-out",   // Real Madrid
  "animate-in fade-in zoom-in-95 duration-1000 ease-out",            // FC Barcelona
  "animate-in fade-in slide-in-from-right-20 duration-1000 ease-out",  // Arsenal FC
  "animate-in fade-in slide-in-from-bottom-20 duration-1000 ease-out",// Manchester City
  "animate-in fade-in zoom-in-110 duration-1000 ease-out",           // Liverpool FC
  "animate-in fade-in slide-in-from-top-20 duration-1000 ease-out",    // Bayern Munich
];

const CAPTAIN_TRANSITIONS = [
  "animate-in fade-in slide-in-from-left-40 duration-700 delay-[1200ms]", // Real Madrid
  "animate-in fade-in zoom-in-50 duration-700 delay-[1200ms]",           // FC Barcelona
  "animate-in fade-in slide-in-from-top-40 duration-700 delay-[1200ms]",  // Arsenal FC
  "animate-in fade-in slide-in-from-bottom-40 duration-700 delay-[1200ms]", // Manchester City
  "animate-in fade-in slide-in-from-left-20 duration-700 delay-[1200ms]", // Liverpool FC
  "animate-in fade-in zoom-in-125 duration-700 delay-[1200ms]",          // Bayern Munich
];

const GK_TRANSITIONS = [
  "animate-in fade-in slide-in-from-right-40 duration-700 delay-[1200ms]",// Real Madrid
  "animate-in fade-in zoom-in-50 duration-700 delay-[1200ms]",           // FC Barcelona
  "animate-in fade-in slide-in-from-bottom-40 duration-700 delay-[1200ms]",// Arsenal FC
  "animate-in fade-in slide-in-from-top-40 duration-700 delay-[1200ms]",   // Manchester City
  "animate-in fade-in slide-in-from-right-20 duration-700 delay-[1200ms]", // Liverpool FC
  "animate-in fade-in zoom-in-75 duration-700 delay-[1200ms]",           // Bayern Munich
];

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const bgImage = PlaceHolderImages.find(img => img.id === 'ucl_bg');

  useEffect(() => {
    if (showIntro) {
      const interval = setInterval(() => {
        setActiveTeamIndex((prev) => (prev + 1) % TEAMS.length);
      }, 4500); // Increased interval to allow for staggered animations to complete
      return () => clearInterval(interval);
    }
  }, [showIntro]);

  const handleEnter = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    const currentTeam = TEAMS[activeTeamIndex];
    const currentHeaderTransition = HEADER_TRANSITIONS[activeTeamIndex];
    const currentCaptainTransition = CAPTAIN_TRANSITIONS[activeTeamIndex];
    const currentGKTransition = GK_TRANSITIONS[activeTeamIndex];

    return (
      <div className="relative h-screen w-full flex flex-col items-center justify-start pt-12 bg-[#000411] text-white overflow-hidden font-body">
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

        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-7xl h-full">
          {/* Header/Logo Section */}
          <div key={`header-${currentTeam.id}`} className={cn("flex flex-col items-center mb-12 shrink-0", currentHeaderTransition)}>
             <div className="w-28 h-28 bg-white/5 backdrop-blur-3xl rounded-full p-2.5 border-2 border-primary/20 shadow-[0_0_60px_rgba(0,212,255,0.2)] mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10" />
                <img 
                  src={currentTeam.logoUrl} 
                  alt={currentTeam.name} 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" 
                />
             </div>
             <h2 className="text-6xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
               {currentTeam.name}
             </h2>
          </div>

          {/* Epic Podium Layout */}
          <div className="flex flex-col md:row items-end justify-center gap-6 w-full max-w-4xl px-4 mt-20 mb-20">
             
             {/* Captain Card */}
             <div 
               key={`captain-${currentTeam.id}`}
               className={cn(
                 "flex-1 w-full md:w-auto epic-card-frame p-4 flex flex-col items-center transition-all duration-300 relative group overflow-hidden h-[340px]",
                 currentCaptainTransition
               )}
             >
                <div className="epic-neon-energy" />
                <div className="epic-hex-pattern" />
                <div className="absolute top-4 left-4 z-20">
                   <div className="bg-[#d4af37] px-3 py-1 rounded-[4px] text-[8px] font-black text-black uppercase tracking-widest shadow-lg">CPT</div>
                </div>
                <div className="w-full aspect-[4/5] max-w-[140px] rounded-xl bg-black/40 flex items-center justify-center mb-6 border border-white/10 overflow-hidden relative z-10 shadow-inner group-hover:border-[#d4af37]/40 transition-colors">
                   <Image 
                     src={currentTeam.captainImageUrl} 
                     alt={currentTeam.captain} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-110" 
                     data-ai-hint="footballer captain"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="relative z-10 mb-10 text-center">
                  <span className="text-[9px] font-black tracking-[0.4em] text-[#d4af37] uppercase mb-1 opacity-80 block">CAPTAIN</span>
                  <span className="text-xl font-black uppercase italic text-white tracking-tight leading-none truncate max-w-[150px]">{currentTeam.captain}</span>
                </div>
                <div className="epic-podium">
                   <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />)}
                   </div>
                   <Hexagon className="w-3.5 h-3.5 text-primary fill-primary/20" />
                </div>
             </div>

             {/* Manager Card (Central Highlight - Always Spins) */}
             <div 
               key={`manager-${currentTeam.id}`}
               className={cn(
                 "flex-[1.1] w-full md:w-auto epic-card-frame p-6 flex flex-col items-center transform scale-110 md:-translate-y-12 shadow-[0_30px_100px_rgba(0,191,255,0.3)] z-20 relative group overflow-hidden h-[360px]",
                 "animate-card-spin"
               )}
             >
                <div className="epic-neon-energy opacity-100" />
                <div className="epic-hex-pattern opacity-40" />
                <div className="absolute top-6 left-6 z-20">
                   <div className="bg-primary px-4 py-1.5 rounded-[4px] text-[9px] font-black text-black uppercase tracking-widest shadow-lg">MGR</div>
                </div>
                <div className="w-full aspect-[4/5] max-w-[160px] rounded-2xl bg-black/40 flex items-center justify-center mb-8 border-2 border-primary/20 overflow-hidden relative z-10 shadow-2xl group-hover:border-primary/50 transition-colors">
                   <Image 
                     src={currentTeam.managerImageUrl} 
                     alt={currentTeam.manager} 
                     fill 
                     className="object-cover scale-110 transition-transform duration-700 group-hover:scale-125" 
                     data-ai-hint="portrait manager"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 mb-12 text-center">
                  <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-1.5 drop-shadow-md block">MANAGER</span>
                  <span className="text-2xl font-black uppercase italic text-white tracking-tighter leading-none">{currentTeam.manager}</span>
                </div>
                <div className="epic-podium h-[58px] w-[75%]">
                   <div className="flex gap-1 mb-1.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />)}
                   </div>
                   <Zap className="w-4 h-4 text-primary fill-primary animate-pulse" />
                </div>
             </div>

             {/* GK Card */}
             <div 
               key={`gk-${currentTeam.id}`}
               className={cn(
                 "flex-1 w-full md:w-auto epic-card-frame p-4 flex flex-col items-center transition-all duration-300 relative group overflow-hidden h-[340px]",
                 currentGKTransition
               )}
             >
                <div className="epic-neon-energy" />
                <div className="epic-hex-pattern" />
                <div className="absolute top-4 left-4 z-20">
                   <div className="bg-[#d4af37] px-3 py-1 rounded-[4px] text-[8px] font-black text-black uppercase tracking-widest shadow-lg">GKP</div>
                </div>
                <div className="w-full aspect-[4/5] max-w-[140px] rounded-xl bg-black/40 flex items-center justify-center mb-6 border border-white/10 overflow-hidden relative z-10 shadow-inner group-hover:border-[#d4af37]/40 transition-colors">
                   <Image 
                     src={currentTeam.gkImageUrl} 
                     alt={currentTeam.gk} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-110" 
                     data-ai-hint="goalkeeper portrait"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="relative z-10 mb-10 text-center">
                  <span className="text-[9px] font-black tracking-[0.4em] text-[#d4af37] uppercase mb-1 opacity-80 block">GOALKEEPER</span>
                  <span className="text-xl font-black uppercase italic text-white tracking-tight leading-none truncate max-w-[150px]">{currentTeam.gk}</span>
                </div>
                <div className="epic-podium">
                   <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />)}
                   </div>
                   <Hexagon className="w-3.5 h-3.5 text-primary fill-primary/20" />
                </div>
             </div>

          </div>

          <div className="flex flex-col items-center gap-6 pb-12 shrink-0">
            <Button 
              onClick={handleEnter}
              className="h-12 px-10 text-[10px] font-black uppercase tracking-[0.4em] rounded-xl bg-white text-black hover:bg-primary hover:text-white transition-all group shadow-2xl border-none"
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
                    activeTeamIndex === i ? "bg-primary w-10 shadow-[0_0_15px_rgba(0,212,255,1)]" : "bg-white/20"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.8em] opacity-20 whitespace-nowrap">
           PROCEED TO AUCTION SYSTEM • WELFARE DIIA • 2024
        </div>

        <style jsx global>{`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-[#000411] text-white overflow-hidden font-body">
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
              START AUCTION
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
