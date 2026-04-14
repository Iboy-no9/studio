
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'ucl_bg');

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
             <span className="text-sm font-black tracking-[0.4em] text-white uppercase leading-none mt-1.5 opacity-50">Diia Presents</span>
          </div>
        </div>

        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8 animate-in fade-in zoom-in-95 duration-1000">
          WPL<br />
          <span className="text-primary drop-shadow-[0_0_30px_rgba(0,212,255,0.4)]">AUCTION</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-[0.2em] font-medium mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          The ultimate professional player draft experience. Build your dream squad with real-time bidding.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <Link href="/draft">
            <Button className="h-20 px-12 text-xl font-black uppercase tracking-[0.2em] rounded-2xl bg-primary text-black hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_50px_rgba(0,212,255,0.3)] group">
              <Play className="w-6 h-6 mr-4 fill-current group-hover:scale-110 transition-transform" />
              Start Draft
            </Button>
          </Link>
          
          <div className="flex items-center gap-2 text-secondary font-black text-sm tracking-widest uppercase bg-white/5 border border-white/10 px-6 py-3 rounded-xl backdrop-blur-md">
            <Star className="w-4 h-4 fill-current" />
            <span>Premium Edition v1.0</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 flex gap-8 z-10 opacity-30">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest">Resolution</span>
          <span className="text-xl font-black italic tracking-tighter">4K ULTRA HD</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest">Network</span>
          <span className="text-xl font-black italic tracking-tighter">ED SPORTS</span>
        </div>
      </div>

      <div className="absolute top-1/2 -right-24 -translate-y-1/2 rotate-90 text-[10rem] font-black text-white/[0.02] select-none tracking-tighter uppercase whitespace-nowrap">
        LEAGUE CHAMPIONS 2024
      </div>
    </div>
  );
}
