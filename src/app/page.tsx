
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Play, ChevronRight, User, Star, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TEAMS } from '@/lib/auction-data';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const bgImage = PlaceHolderImages.find(img => img.id === 'ucl_bg');

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

  if (showIntro) {
    const currentTeam = TEAMS[activeTeamIndex];
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

        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-7xl">
          {/* Header/Logo Section */}
          <div className="flex flex-col items-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="w-20 h-20 bg-white/5 backdrop-blur-3xl rounded-full p-2.5 border-2 border-primary/20 shadow-[0_0_50px_rgba(0,212,255,0.1)] mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <img 
                  src={currentTeam.logoUrl} 
                  alt={currentTeam.name} 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                />
             </div>
             <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
               {currentTeam.name}
             </h2>
          </div>

          {/* Cards Section - Moved Down and Sized Down */}
          <div key={currentTeam.id} className="flex flex-col md:flex-row items-end justify-center gap-4 w-full max-w-5xl px-4 animate-in fade-in zoom-in duration-700 mt-12">
             
             {/* Manager Card */}
             <div className="flex-1 w-full md:w-auto legendary-card-bg border border-white/10 p-4 rounded-[2rem] flex flex-col items-center transition-all duration-300 shadow-xl relative">
                <div className="absolute top-4 left-4 z-20">
                   <div className="bg-primary px-1.5 py-0.5 rounded-[4px] text-[7px] font-black text-black uppercase tracking-widest shadow-lg">MGR</div>
                </div>
                <div className="w-full aspect-square max-w-[130px] rounded-xl bg-black/40 flex items-center justify-center mb-4 border border-white/10 overflow-hidden relative shadow-inner">
                   <Image 
                     src={currentTeam.managerImageUrl} 
                     alt={currentTeam.manager} 
                     fill 
                     className="object-cover" 
                     data-ai-hint="portrait manager"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <span className="text-[8px] font-black tracking-[0.3em] text-primary uppercase mb-1 opacity-80">MANAGER</span>
                <span className="text-lg font-black uppercase italic text-white tracking-tight text-center">{currentTeam.manager}</span>
             </div>

             {/* Captain Card (Elevated and Star of the Show) */}
             <div className="flex-[1.1] w-full md:w-auto legendary-card-bg border-2 border-secondary/40 p-6 rounded-[2.5rem] flex flex-col items-center transform scale-100 md:scale-105 md:-translate-y-10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-20 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-black px-6 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(255,215,0,0.4)] border border-white/20 whitespace-nowrap z-30 animate-pulse">
                   FRANCHISE STAR
                </div>
                <div className="absolute top-6 left-6 z-20">
                   <div className="bg-secondary px-2 py-0.5 rounded-[4px] text-[8px] font-black text-black uppercase tracking-widest shadow-lg">CPT</div>
                </div>
                <div className="w-full aspect-square max-w-[170px] rounded-[2rem] bg-black/40 flex items-center justify-center mb-6 border border-secondary/20 overflow-hidden relative shadow-2xl">
                   <Image 
                     src={currentTeam.captainImageUrl} 
                     alt={currentTeam.captain} 
                     fill 
                     className="object-cover scale-110" 
                     data-ai-hint="footballer captain"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   <div className="absolute top-3 right-3">
                     <Zap className="w-6 h-6 text-secondary fill-secondary drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
                   </div>
                </div>
                <span className="text-[9px] font-black tracking-[0.4em] text-secondary uppercase mb-1 drop-shadow-md">CAPTAIN</span>
                <span className="text-2xl font-black uppercase italic text-white tracking-tighter text-center leading-none">{currentTeam.captain}</span>
                <div className="mt-3 flex gap-1">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />)}
                </div>
             </div>

             {/* GK Card */}
             <div className="flex-1 w-full md:w-auto legendary-card-bg border border-white/10 p-4 rounded-[2rem] flex flex-col items-center transition-all duration-300 shadow-xl relative">
                <div className="absolute top-4 left-4 z-20">
                   <div className="bg-secondary/80 px-1.5 py-0.5 rounded-[4px] text-[7px] font-black text-black uppercase tracking-widest shadow-lg">GKP</div>
                </div>
                <div className="w-full aspect-square max-w-[130px] rounded-xl bg-black/40 flex items-center justify-center mb-4 border border-white/10 overflow-hidden relative shadow-inner">
                   <Image 
                     src={currentTeam.gkImageUrl} 
                     alt={currentTeam.gk} 
                     fill 
                     className="object-cover" 
                     data-ai-hint="goalkeeper portrait"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <span className="text-[8px] font-black tracking-[0.3em] text-secondary uppercase mb-1 opacity-80">GOALKEEPER</span>
                <span className="text-lg font-black uppercase italic text-white tracking-tight text-center">{currentTeam.gk}</span>
             </div>

          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <Button 
              onClick={handleEnter}
              className="h-12 px-8 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl bg-white text-black hover:bg-primary hover:text-white transition-all group shadow-2xl"
            >
              Skip Intro
              <ChevronRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex gap-2.5">
              {TEAMS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-700",
                    activeTeamIndex === i ? "bg-primary w-8 shadow-[0_0_8px_rgba(0,212,255,0.8)]" : "bg-white/20"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-[0.6em] opacity-30 whitespace-nowrap">
           PROCEED TO AUCTION SYSTEM • WELFARE DIIA • 2024
        </div>
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
