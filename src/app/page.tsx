"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { TEAMS, PLAYERS, Player, Team } from '@/lib/auction-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Zap, History, UserCheck, AlertCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white p-6 gap-6 font-headline overflow-hidden">
      
      {/* LEFT PANEL: Teams */}
      <div className="w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
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
                : "bg-card border-transparent hover:bg-muted"
            )}
          >
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                   {team.name.charAt(0)}
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
      <div className="flex-1 flex flex-col gap-6 relative">
        <div className="flex justify-between items-end px-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Live Auction Status</span>
            <div className="flex items-center gap-3">
              <Badge className={cn(
                "px-4 py-1 text-sm font-bold uppercase",
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
             <span className="text-xs text-muted-foreground uppercase tracking-widest">Player Index</span>
             <div className="text-xl font-bold">{currentPlayerIdx + 1} / {PLAYERS.length}</div>
          </div>
        </div>

        <div className="flex-1 flex gap-10 items-center justify-center">
          {/* THE ICONIC CARD */}
          <div className="relative aspect-[3/4.2] w-[450px] legendary-card-bg rounded-[2.5rem] p-1 border-[6px] border-white/20 shadow-2xl flex flex-col transition-all duration-500 hover:scale-[1.02]">
            {/* Top Section: Rating & Position */}
            <div className="absolute top-8 left-8 z-20">
              <div className="text-7xl font-black text-[#00ffd0] leading-none drop-shadow-md italic">
                {currentPlayer.rating}
              </div>
              <div className="text-3xl font-bold text-white uppercase ml-1 tracking-tighter">
                {currentPlayer.position === 'Forward' ? 'SS' : 
                 currentPlayer.position === 'Midfielder' ? 'AMF' :
                 currentPlayer.position === 'Defender' ? 'CB' : 'GK'}
              </div>
            </div>

            {/* Club Logo Overlay */}
            <div className="absolute top-28 left-8 z-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
               <img src={TEAMS[currentPlayerIdx % TEAMS.length].logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
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
            <div className="absolute bottom-14 left-0 right-0 z-20 text-center flex flex-col items-center">
               <div className="text-lg font-medium text-white/80 tracking-widest mb-1 italic">01.01.2024</div>
               <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg px-4 truncate max-w-full">
                 {currentPlayer.name}
               </h1>
            </div>

            {/* Star Footer */}
            <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center gap-1">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-glow" />
               ))}
            </div>

            {/* SOLD Overlay */}
            {status === 'SOLD' && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-[2.2rem] animate-in fade-in duration-300">
                <div className="text-center animate-sold">
                   <div className="text-8xl font-black text-secondary italic tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] uppercase">SOLD!</div>
                   <div className="text-2xl mt-4 font-bold text-white uppercase tracking-widest bg-black/50 py-2 px-6 rounded-full inline-block border border-white/20">
                      To {TEAMS.find(t => t.id === selectedTeamId)?.name}
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Bidding Controls Side */}
          <div className="flex-1 flex flex-col justify-center items-center gap-8 max-w-md">
              <div className="text-center">
                <div className="text-sm text-muted-foreground uppercase tracking-[0.3em] font-bold mb-4">Current Valuation</div>
                <div className={cn(
                  "text-[8rem] font-black tracking-tighter leading-none text-primary transition-all duration-200 tabular-nums drop-shadow-[0_0_15px_rgba(74,176,237,0.4)]",
                  bidAnimating && "animate-bid"
                )}>
                  ₹{currentBid > 0 ? currentBid.toLocaleString() : currentPlayer.basePrice.toLocaleString()}
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-14 text-lg font-bold border-white/10 hover:bg-white/10" onClick={() => handleBid(100)}>+100</Button>
                  <Button variant="outline" className="h-14 text-lg font-bold border-white/10 hover:bg-white/10" onClick={() => handleBid(500)}>+500</Button>
                  <Button variant="outline" className="h-14 text-lg font-bold border-white/10 hover:bg-white/10" onClick={() => handleBid(1000)}>+1000</Button>
                </div>
                
                <Button 
                  variant="secondary" 
                  className="h-20 text-3xl font-black uppercase tracking-tighter shadow-2xl shadow-secondary/20 glow-accent"
                  onClick={handleSold}
                  disabled={status !== 'BIDDING' || !selectedTeamId}
                >
                  Confirm Purchase
                </Button>

                {status === 'SOLD' && (
                  <Button 
                    variant="ghost" 
                    className="h-14 text-xl font-bold uppercase tracking-widest border border-white/5"
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
           <div className="absolute inset-0 z-[101] bg-background/95 flex items-center justify-center text-center p-10 animate-in zoom-in duration-500">
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

      {/* RIGHT PANEL: History */}
      <div className="w-1/4 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <History className="text-secondary w-6 h-6" />
          <h2 className="text-xl font-bold tracking-tight text-secondary uppercase">Draft Board</h2>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
          {soldPlayers.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-10 text-center px-10">
              <UserCheck className="w-20 h-20 mb-4" />
              <p className="font-bold text-lg">No active signings yet.</p>
            </div>
          ) : (
            soldPlayers.map((sold, idx) => (
              <div key={idx} className="bg-card/40 p-3 rounded-xl border border-white/5 flex gap-4 animate-in slide-in-from-right duration-500">
                <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0 border border-white/10">
                  <img src={sold.player.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="font-black text-sm truncate uppercase italic">{sold.player.name}</div>
                   <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tighter opacity-70">{sold.team.name}</div>
                   <div className="text-lg font-black text-secondary tabular-nums">₹{sold.price.toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
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