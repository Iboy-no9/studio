
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

          {/* Elite Cards Section - Manager is the Star highlight */}
          <div key={currentTeam.id} className="flex flex-col md:flex-row items-end justify-center gap-6 w-full max-w-5xl px-4 animate-in fade-in zoom-in duration-700 mt-12">
             
             {/* Captain Card (Elite Design) */}
             <div className="flex-1 w-full md:w-auto legendary-card-bg border border-white/10 p-5 rounded-[2.5rem] flex flex-col items-center transition-all duration-300 shadow-2xl relative group overflow-hidden">
                <div className="absolute top-5 left-5 z-20">
                   <div className="bg-secondary px-2 py-0.5 rounded-[4px] text-[8px] font-black text-black uppercase tracking-widest shadow-lg">CPT</div>
                </div>
                <div className="w-full aspect-square max-w-[140px] rounded-2xl bg-black/40 flex items-center justify-center mb-5 border border-white/10 overflow-hidden relative shadow-inner group-hover:border-secondary/40 transition-colors">
                   <Image 
                     src={currentTeam.captainImageUrl} 
                     alt={currentTeam.captain} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-110" 
                     data-ai-hint="footballer captain"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <span className="text-[9px] font-black tracking-[0.4em] text-secondary uppercase mb-1 opacity-80">CAPTAIN</span>
                <span className="text-xl font-black uppercase italic text-white tracking-tight text-center leading-none">{currentTeam.captain}</span>
                <div className="mt-3 flex gap-0.5">
                   {[...Array(4)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-secondary text-secondary" />)}
                </div>
             </div>

             {/* Manager Card (Elite Highlight Centerpiece) */}
             <div className="flex-[1.2] w-full md:w-auto legendary-card-bg border-2 border-primary/50 p-7 rounded-[3rem] flex flex-col items-center transform scale-100 md:scale-110 md:-translate-y-12 shadow-[0_30px_100px_rgba(0,212,255,0.25)] z-20 relative group overflow-hidden">
                {/* Elite Badge Overlay */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(0,212,255,0.5)] border border-white/30 whitespace-nowrap z-30 animate-pulse">
                   ELITE TACTICIAN
                </div>
                <div className="absolute top-8 left-8 z-20">
                   <div className="bg-primary px-3 py-1 rounded-[4px] text-[9px] font-black text-black uppercase tracking-widest shadow-lg">MGR</div>
                </div>
                <div className="w-full aspect-square max-w-[190px] rounded-[2.5rem] bg-black/40 flex items-center justify-center mb-6 border-2 border-primary/20 overflow-hidden relative shadow-2xl group-hover:border-primary/50 transition-colors">
                   <Image 
                     src={currentTeam.managerImageUrl} 
                     alt={currentTeam.manager} 
                     fill 
                     className="object-cover scale-110 transition-transform duration-700 group-hover:scale-125" 
                     data-ai-hint="portrait manager"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   <div className="absolute top-4 right-4">
                     <Shield className="w-8 h-8 text-primary fill-primary drop-shadow-[0_0_15px_rgba(0,212,255,0.8)] animate-bounce-slow" />
                   </div>
                </div>
                <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-1.5 drop-shadow-md">MANAGER</span>
                <span className="text-3xl font-black uppercase italic text-white tracking-tighter text-center leading-none">{currentTeam.manager}</span>
                <div className="mt-4 flex gap-1.5">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]" />)}
                </div>
             </div>

             {/* GK Card (Elite Design) */}
             <div className="flex-1 w-full md:w-auto legendary-card-bg border border-white/10 p-5 rounded-[2.5rem] flex flex-col items-center transition-all duration-300 shadow-2xl relative group overflow-hidden">
                <div className="absolute top-5 left-5 z-20">
                   <div className="bg-secondary px-2 py-0.5 rounded-[4px] text-[8px] font-black text-black uppercase tracking-widest shadow-lg">GKP</div>
                </div>
                <div className="w-full aspect-square max-w-[140px] rounded-2xl bg-black/40 flex items-center justify-center mb-5 border border-white/10 overflow-hidden relative shadow-inner group-hover:border-secondary/40 transition-colors">
                   <Image 
                     src={currentTeam.gkImageUrl} 
                     alt={currentTeam.gk} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-110" 
                     data-ai-hint="goalkeeper portrait"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <span className="text-[9px] font-black tracking-[0.4em] text-secondary uppercase mb-1 opacity-80">GOALKEEPER</span>
                <span className="text-xl font-black uppercase italic text-white tracking-tight text-center leading-none">{currentTeam.gk}</span>
                <div className="mt-3 flex gap-0.5">
                   {[...Array(4)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-secondary text-secondary" />)}
                </div>
             </div>

          </div>

          <div className="mt-20 flex flex-col items-center gap-6">
            <Button 
              onClick={handleEnter}
              className="h-12 px-10 text-[10px] font-black uppercase tracking-[0.4em] rounded-xl bg-white text-black hover:bg-primary hover:text-white transition-all group shadow-2xl border-none"
            >
              Skip Intro
              <ChevronRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex gap-3">
              {TEAMS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-700",
                    activeTeamIndex === i ? "bg-primary w-10 shadow-[0_0_12px_rgba(0,212,255,1)]" : "bg-white/10"
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

