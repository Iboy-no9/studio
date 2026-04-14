
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Play, ChevronRight, User, Star, Shield } from 'lucide-react';
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

        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-6xl">
          <div className="flex items-center gap-4 mb-10 animate-pulse">
            <Trophy className="w-10 h-10 text-secondary" />
            <div className="flex flex-col items-start text-left">
               <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase leading-tight">Welfare DIIA Presents</span>
               <span className="text-xl font-black tracking-[0.2em] text-white uppercase leading-tight">WPL AUCTION 2024</span>
            </div>
          </div>

          <div key={currentTeam.id} className="flex flex-col items-center animate-in fade-in zoom-in duration-700 w-full">
             <div className="w-48 h-48 md:w-56 md:h-56 bg-white/5 backdrop-blur-3xl rounded-full p-8 border-4 border-primary/20 shadow-[0_0_100px_rgba(0,212,255,0.2)] mb-6 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5" />
                <img 
                  src={currentTeam.logoUrl} 
                  alt={currentTeam.name} 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" 
                />
             </div>
             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-12">
               {currentTeam.name}
             </h2>

             {/* Three Card Layout for Roles */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {/* Manager Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col items-center group/card hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                   <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 border border-primary/30 group-hover/card:scale-110 transition-transform overflow-hidden relative">
                      <Image 
                        src={currentTeam.managerImageUrl} 
                        alt={currentTeam.manager} 
                        fill 
                        className="object-cover" 
                        data-ai-hint="portrait manager"
                      />
                   </div>
                   <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase mb-1">MANAGER</span>
                   <span className="text-lg font-black uppercase italic text-white tracking-tight">{currentTeam.manager}</span>
                </div>

                {/* Captain Card */}
                <div className="bg-primary/10 backdrop-blur-lg border-2 border-primary/30 p-8 rounded-[2rem] flex flex-col items-center transform scale-110 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 hover:scale-[1.12] transition-all duration-300">
                   <div className="w-24 h-24 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 border border-secondary/30 overflow-hidden relative shadow-2xl">
                      <Image 
                        src={currentTeam.captainImageUrl} 
                        alt={currentTeam.captain} 
                        fill 
                        className="object-cover" 
                        data-ai-hint="footballer captain"
                      />
                   </div>
                   <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-1">CAPTAIN</span>
                   <span className="text-xl font-black uppercase italic text-white tracking-tight">{currentTeam.captain}</span>
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">KEY PLAYER</div>
                </div>

                {/* GK Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col items-center group/card hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                   <div className="w-20 h-20 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 border border-secondary/30 group-hover/card:scale-110 transition-transform overflow-hidden relative">
                      <Image 
                        src={currentTeam.gkImageUrl} 
                        alt={currentTeam.gk} 
                        fill 
                        className="object-cover" 
                        data-ai-hint="goalkeeper portrait"
                      />
                   </div>
                   <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase mb-1">GOALKEEPER</span>
                   <span className="text-lg font-black uppercase italic text-white tracking-tight">{currentTeam.gk}</span>
                </div>
             </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
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
