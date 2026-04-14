
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { TEAMS, PLAYERS, Player, Team } from '@/lib/auction-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Zap, History, UserCheck, AlertCircle, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface SoldPlayer {
  player: Player;
  team: Team;
  price: number;
}

export default function EliteDraftAuction() {
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [currentBid, setCurrentBid] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [soldPlayers, setSoldPlayers] = useState<SoldPlayer[]>([]);
  const [teamBudgets, setTeamBudgets] = useState<Record<string, number>>(
    TEAMS.reduce((acc, team) => ({ ...acc, [team.id]: team.budget }), {})
  );
  const [status, setStatus] = useState<'IDLE' | 'BIDDING' | 'SOLD' | 'FINISHED'>('IDLE');
  const [timer, setTimer] = useState(10);
  const [bidAnimating, setBidAnimating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentPlayer = PLAYERS[currentPlayerIdx];
  const bgImage = PlaceHolderImages.find(img => img.id === 'ucl_bg');

  const handleNextPlayer = useCallback(() => {
    if (currentPlayerIdx < PLAYERS.length - 1) {
      setCurrentPlayerIdx(prev => prev + 1);
      setCurrentBid(0);
      setStatus('BIDDING');
      setTimer(10);
      setSelectedTeamId(null);
    } else {
      setStatus('FINISHED');
    }
  }, [currentPlayerIdx]);

  const handleBid = useCallback((increment: number) => {
    if (status !== 'BIDDING' && status !== 'IDLE') return;
    if (!selectedTeamId) {
      setErrorMsg("Please select a team first!");
      return;
    }

    const newBid = (currentBid === 0 ? currentPlayer.basePrice : currentBid) + increment;

    if (teamBudgets[selectedTeamId] < newBid) {
      setErrorMsg("Insufficient Budget!");
      return;
    }

    setCurrentBid(newBid);
    setStatus('BIDDING');
    setTimer(10);
    setBidAnimating(true);
    setTimeout(() => setBidAnimating(false), 200);
    setErrorMsg(null);
  }, [currentBid, currentPlayer.basePrice, selectedTeamId, status, teamBudgets]);

  const handleSold = useCallback(() => {
    if (status !== 'BIDDING' || !selectedTeamId || currentBid === 0) return;

    const team = TEAMS.find(t => t.id === selectedTeamId)!;
    const soldPlayer: SoldPlayer = {
      player: currentPlayer,
      team: team,
      price: currentBid
    };

    setSoldPlayers(prev => [soldPlayer, ...prev]);
    setTeamBudgets(prev => ({
      ...prev,
      [selectedTeamId]: prev[selectedTeamId] - currentBid
    }));
    setStatus('SOLD');
  }, [currentBid, currentPlayer, selectedTeamId, status]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleBid(100);
      if (e.key === '2') handleBid(500);
      if (e.key === '3') handleBid(1000);
      if (e.key === 'Enter') handleSold();
      if (e.key === 'n' || e.key === 'N') handleNextPlayer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBid, handleSold, handleNextPlayer]);

  useEffect(() => {
    if (status === 'BIDDING' && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [status, timer]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  // Derive unsold players
  const unsoldPlayers = PLAYERS.filter(p => !soldPlayers.some(s => s.player.id === p.id) && p.id !== currentPlayer.id);

  return (
    <div className="relative flex h-screen w-full bg-[#0a0a0a] text-white p-6 gap-6 font-headline overflow-hidden">
      
      {/* BACKGROUND IMAGE OVERLAY */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgImage.imageUrl} 
            alt="UCL Background" 
            fill 
            className="object-cover opacity-30" 
            priority
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        </div>
      )}

      {/* LEFT PANEL: Teams */}
      <div className="w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar z-10">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="text-primary w-6 h-6" />
          <h2 className="text-xl font-bold tracking-tight text-primary">FRANCHISES</h2>
        </div>
        {TEAMS.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeamId(team.id)}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all border-2 relative overflow-hidden group",
              selectedTeamId === team.id 
                ? "bg-primary/20 border-primary glow-primary scale-105 z-10 shadow-lg shadow-primary/20" 
                : "bg-card/60 backdrop-blur-sm border-transparent hover:bg-muted/80"
            )}
          >
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs border border-white/10 overflow-hidden">
                   <img src={team.logoUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{team.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                    <Zap className="w-3 h-3 text-secondary" />
                    <span>REMAINING</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">₹{teamBudgets[team.id].toLocaleString()}</div>
              </div>
            </div>
            <Progress value={(teamBudgets[team.id] / team.budget) * 100} className="h-1 mt-3" />
          </div>
        ))}
      </div>

      {/* CENTER FOCUS: Iconic Player Card & Bidding */}
      <div className="flex-1 flex flex-col gap-6 relative z-10">
        <div className="flex justify-between items-end px-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-bold">Live Auction Status</span>
            <div className="flex items-center gap-3">
              <Badge className={cn(
                "px-4 py-1 text-sm font-bold uppercase rounded-md",
                status === 'BIDDING' ? "bg-primary text-black animate-pulse" : 
                status === 'SOLD' ? "bg-secondary text-black" : "bg-muted"
              )}>
                {status}
              </Badge>
              {status === 'BIDDING' && (
                <span className="text-4xl font-black text-secondary tabular-nums drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]">
                  00:{timer < 10 ? `0${timer}` : timer}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
             <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Player Index</span>
             <div className="text-xl font-bold">{currentPlayerIdx + 1} / {PLAYERS.length}</div>
          </div>
        </div>

        <div className="flex-1 flex gap-10 items-center justify-center">
          {/* THE ICONIC CARD - RESIZED TO 360px */}
          <div className="relative aspect-[3/4.2] w-[360px] legendary-card-bg rounded-[2rem] p-1 border-[4px] border-white/20 shadow-2xl flex flex-col transition-all duration-500 hover:scale-[1.02]">
            {/* Top Section: Rating & Position */}
            <div className="absolute top-6 left-6 z-20">
              <div className="text-6xl font-black text-[#00ffd0] leading-none drop-shadow-md italic">
                {currentPlayer.rating}
              </div>
              <div className="text-2xl font-bold text-white uppercase ml-1 tracking-tighter">
                {currentPlayer.position === 'Forward' ? 'SS' : 
                 currentPlayer.position === 'Midfielder' ? 'AMF' :
                 currentPlayer.position === 'Defender' ? 'CB' : 'GK'}
              </div>
            </div>

            {/* Main Player Image */}
            <div className="absolute inset-0 z-10">
              <img 
                src={currentPlayer.imageUrl} 
                alt={currentPlayer.name} 
                className="w-full h-full object-cover object-center transform scale-110 translate-y-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e004d] via-transparent to-transparent opacity-80" />
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-12 left-0 right-0 z-20 text-center flex flex-col items-center px-4">
               <div className="text-sm font-medium text-white/80 tracking-widest mb-1 italic uppercase">{currentPlayer.nationality}</div>
               <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg truncate w-full">
                 {currentPlayer.name}
               </h1>
            </div>

            {/* Star Footer */}
            <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center gap-1">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-glow" />
               ))}
            </div>

            {/* SOLD Overlay */}
            {status === 'SOLD' && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-[1.8rem] animate-in fade-in duration-300">
                <div className="text-center animate-sold">
                   <div className="text-7xl font-black text-secondary italic tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] uppercase">SOLD!</div>
                   <div className="text-xl mt-3 font-bold text-white uppercase tracking-widest bg-black/50 py-2 px-6 rounded-full inline-block border border-white/20">
                      To {TEAMS.find(t => t.id === selectedTeamId)?.name}
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Bidding Controls Side */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6 max-w-sm">
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-bold mb-2">Current Valuation</div>
                <div className={cn(
                  "text-[6rem] font-black tracking-tighter leading-none text-primary transition-all duration-200 tabular-nums drop-shadow-[0_0_15px_rgba(74,176,237,0.4)]",
                  bidAnimating && "animate-bid"
                )}>
                  ₹{currentBid > 0 ? currentBid.toLocaleString() : currentPlayer.basePrice.toLocaleString()}
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="h-12 text-md font-bold border-white/10 hover:bg-white/10 backdrop-blur-md" onClick={() => handleBid(100)}>+100</Button>
                  <Button variant="outline" className="h-12 text-md font-bold border-white/10 hover:bg-white/10 backdrop-blur-md" onClick={() => handleBid(500)}>+500</Button>
                  <Button variant="outline" className="h-12 text-md font-bold border-white/10 hover:bg-white/10 backdrop-blur-md" onClick={() => handleBid(1000)}>+1000</Button>
                </div>
                
                <Button 
                  variant="secondary" 
                  className="h-16 text-2xl font-black uppercase tracking-tighter shadow-2xl shadow-secondary/20 glow-accent"
                  onClick={handleSold}
                  disabled={status !== 'BIDDING' || !selectedTeamId}
                >
                  Confirm Purchase
                </Button>

                {status === 'SOLD' && (
                  <Button 
                    variant="ghost" 
                    className="h-12 text-lg font-bold uppercase tracking-widest border border-white/5 backdrop-blur-sm hover:bg-white/10"
                    onClick={handleNextPlayer}
                  >
                    Draft Next Player (N)
                  </Button>
                )}
              </div>
          </div>
        </div>

        {errorMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-destructive text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl animate-in slide-in-from-top duration-300">
            <AlertCircle className="w-6 h-6" />
            <span className="text-xl font-bold">{errorMsg}</span>
          </div>
        )}

        {status === 'FINISHED' && (
           <div className="absolute inset-0 z-[101] bg-background/95 backdrop-blur-lg flex items-center justify-center text-center p-10 animate-in zoom-in duration-500">
              <div className="max-w-2xl">
                <Trophy className="w-40 h-40 text-secondary mx-auto mb-8 drop-shadow-[0_0_30px_rgba(100,255,218,0.5)]" />
                <h2 className="text-7xl font-black tracking-tighter mb-4 italic">DRAFT COMPLETED</h2>
                <p className="text-2xl text-muted-foreground mb-12">The rosters are finalized. All iconic signings have been claimed.</p>
                <Button variant="secondary" size="lg" className="h-20 px-16 text-2xl font-black rounded-full uppercase" onClick={() => window.location.reload()}>
                   Start New Session
                </Button>
              </div>
           </div>
        )}
      </div>

      {/* RIGHT PANEL: Draft Board & Unsold Pool */}
      <div className="w-1/4 flex flex-col gap-4 overflow-hidden z-10">
        <Tabs defaultValue="sold" className="w-full flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/30 backdrop-blur-md border border-white/5 p-1 mb-2">
            <TabsTrigger value="sold" className="flex items-center gap-2 font-bold uppercase tracking-tight text-xs data-[state=active]:bg-secondary data-[state=active]:text-black">
              <History className="w-3 h-3" />
              Sold
            </TabsTrigger>
            <TabsTrigger value="unsold" className="flex items-center gap-2 font-bold uppercase tracking-tight text-xs data-[state=active]:bg-primary data-[state=active]:text-black">
              <Users className="w-3 h-3" />
              Pool
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sold" className="flex-1 overflow-hidden mt-0 flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
              {soldPlayers.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 text-center px-10">
                  <UserCheck className="w-16 h-16 mb-4" />
                  <p className="font-bold text-lg">No active signings yet.</p>
                </div>
              ) : (
                soldPlayers.map((sold, idx) => (
                  <div key={idx} className="bg-card/40 backdrop-blur-sm p-3 rounded-xl border border-white/5 flex gap-4 animate-in slide-in-from-right duration-500">
                    <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0 border border-white/10">
                      <img src={sold.player.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="font-black text-sm truncate uppercase italic">{sold.player.name}</div>
                       <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tighter opacity-70 truncate">{sold.team.name}</div>
                       <div className="text-lg font-black text-secondary tabular-nums">₹{sold.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="unsold" className="flex-1 overflow-hidden mt-0 flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
              {unsoldPlayers.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 text-center px-10">
                  <Star className="w-16 h-16 mb-4" />
                  <p className="font-bold text-lg">No players left in pool.</p>
                </div>
              ) : (
                unsoldPlayers.map((player) => (
                  <div key={player.id} className="bg-card/20 backdrop-blur-sm p-2 rounded-lg border border-white/5 flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0 border border-white/10">
                      <img src={player.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="font-bold text-xs truncate uppercase">{player.name}</div>
                       <div className="text-[10px] font-bold text-muted-foreground uppercase">{player.position}</div>
                    </div>
                    <div className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded">
                      RT: {player.rating}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.6));
        }
      `}</style>
    </div>
  );
}
