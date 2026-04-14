
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { TEAMS, PLAYERS, Player, Team } from '@/lib/auction-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Zap, History, UserCheck, AlertCircle } from 'lucide-react';
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

    const team = TEAMS.find(t => t.id === selectedTeamId)!;
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
    
    // Play sold sound effect if needed (simulated)
    console.log("SOLD!");
  }, [currentBid, currentPlayer, selectedTeamId, status]);

  // Keyboard Shortcuts
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

  // Countdown Logic
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
    <div className="flex h-screen w-full bg-[#14191C] text-white p-6 gap-6 font-headline">
      
      {/* LEFT PANEL: Teams & Budgets */}
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
                ? "bg-primary/20 border-primary glow-primary scale-105 z-10" 
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
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
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

      {/* CENTER FOCUS: Player Card & Current Bid */}
      <div className="flex-1 flex flex-col gap-6 relative">
        {/* Top Progress */}
        <div className="flex justify-between items-end px-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Auction Status</span>
            <div className="flex items-center gap-3">
              <Badge className={cn(
                "px-4 py-1 text-sm font-bold",
                status === 'BIDDING' ? "bg-primary text-black animate-pulse" : 
                status === 'SOLD' ? "bg-secondary text-black" : "bg-muted"
              )}>
                {status}
              </Badge>
              {status === 'BIDDING' && (
                <span className="text-3xl font-black text-secondary tabular-nums">00:{timer < 10 ? `0${timer}` : timer}</span>
              )}
            </div>
          </div>
          <div className="text-right">
             <span className="text-xs text-muted-foreground uppercase tracking-widest">Player Pool</span>
             <div className="text-lg font-bold">{currentPlayerIdx + 1} / {PLAYERS.length}</div>
          </div>
        </div>

        {/* Main Display */}
        <div className="flex-1 bg-card rounded-2xl border border-white/5 flex flex-col relative overflow-hidden shadow-2xl">
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

          {status === 'SOLD' && (
             <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
                <div className="text-center animate-sold">
                   <div className="text-9xl font-black text-secondary italic tracking-tighter drop-shadow-2xl">SOLD!</div>
                   <div className="text-3xl mt-4 font-bold text-white uppercase tracking-widest">
                      To {TEAMS.find(t => t.id === selectedTeamId)?.name}
                   </div>
                </div>
             </div>
          )}

          <div className="flex h-full p-8 gap-10">
            {/* Player Image & Stats */}
            <div className="w-1/3 flex flex-col gap-4">
              <div className="aspect-[3/4] rounded-2xl bg-muted overflow-hidden border-2 border-white/10 relative">
                <img 
                  src={currentPlayer.imageUrl} 
                  alt={currentPlayer.name} 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
                <div className="absolute bottom-4 right-4 bg-primary text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black">
                  {currentPlayer.rating}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 p-3 rounded-xl border border-white/5 text-center">
                   <div className="text-xs text-muted-foreground uppercase">Position</div>
                   <div className="font-bold">{currentPlayer.position}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl border border-white/5 text-center">
                   <div className="text-xs text-muted-foreground uppercase">Nationality</div>
                   <div className="font-bold">{currentPlayer.nationality}</div>
                </div>
              </div>
            </div>

            {/* Bidding Zone */}
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <h1 className="text-7xl font-black tracking-tighter uppercase mb-2 leading-none">
                {currentPlayer.name}
              </h1>
              <div className="h-px w-24 bg-primary mb-12" />

              <div className="mb-4 text-muted-foreground uppercase tracking-widest font-medium">Current Bid Amount</div>
              <div className={cn(
                "text-[10rem] font-black tracking-tighter leading-none text-primary transition-all duration-200 tabular-nums",
                bidAnimating && "animate-bid"
              )}>
                ₹{currentBid > 0 ? currentBid.toLocaleString() : currentPlayer.basePrice.toLocaleString()}
              </div>
              
              <div className="mt-12 w-full max-w-md flex flex-col gap-4">
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-16 text-xl font-bold border-2 border-primary/20 hover:bg-primary/10"
                    onClick={() => handleBid(100)}
                  >
                    +100
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-16 text-xl font-bold border-2 border-primary/20 hover:bg-primary/10"
                    onClick={() => handleBid(500)}
                  >
                    +500
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-16 text-xl font-bold border-2 border-primary/20 hover:bg-primary/10"
                    onClick={() => handleBid(1000)}
                  >
                    +1000
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Button 
                    variant="secondary" 
                    className="flex-1 h-16 text-2xl font-black uppercase tracking-tighter glow-accent"
                    onClick={handleSold}
                    disabled={status !== 'BIDDING' || !selectedTeamId}
                  >
                    Mark as SOLD (Enter)
                  </Button>
                  {status === 'SOLD' && (
                    <Button 
                      variant="outline" 
                      className="w-1/3 h-16 text-xl font-bold border-2"
                      onClick={handleNextPlayer}
                    >
                      Next Player (N)
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Error Popups */}
        {errorMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-destructive text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl animate-in slide-in-from-top duration-300">
            <AlertCircle className="w-6 h-6" />
            <span className="text-xl font-bold">{errorMsg}</span>
          </div>
        )}

        {status === 'FINISHED' && (
           <div className="absolute inset-0 z-[101] bg-background/95 flex flex-center items-center justify-center text-center p-10 animate-in zoom-in">
              <div>
                <Trophy className="w-32 h-32 text-secondary mx-auto mb-6" />
                <h2 className="text-6xl font-black tracking-tighter mb-4">AUCTION FINISHED</h2>
                <p className="text-2xl text-muted-foreground mb-10">All players have been drafted. Review final squads in history.</p>
                <Button variant="primary" size="lg" className="h-16 px-12 text-2xl font-bold rounded-full" onClick={() => window.location.reload()}>
                   Restart Draft
                </Button>
              </div>
           </div>
        )}
      </div>

      {/* RIGHT PANEL: Sold History */}
      <div className="w-1/4 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <History className="text-secondary w-6 h-6" />
          <h2 className="text-xl font-bold tracking-tight text-secondary uppercase">Draft History</h2>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
          {soldPlayers.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center px-6">
              <UserCheck className="w-16 h-16 mb-4" />
              <p className="font-medium">No players sold yet.</p>
            </div>
          ) : (
            soldPlayers.map((sold, idx) => (
              <div key={idx} className="bg-card/50 p-4 rounded-xl border border-white/5 flex gap-4 animate-in slide-in-from-right duration-500">
                <div className="w-12 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                  <img src={sold.player.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="font-bold truncate">{sold.player.name}</div>
                   <div className="text-xs font-bold text-primary mb-1">{sold.team.name}</div>
                   <div className="text-lg font-black text-secondary">₹{sold.price.toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
