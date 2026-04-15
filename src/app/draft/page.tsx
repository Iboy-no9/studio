
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TEAMS, PLAYERS, Player, Team } from '@/lib/auction-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Zap, History, UserCheck, AlertCircle, Star, Users, SkipForward, X, CheckCircle2, RotateCcw, LayoutDashboard, Wallet, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface SoldPlayer {
  player: Player;
  team: Team;
  price: number;
}

export default function EliteDraftAuction() {
  const auctionTeams = useMemo(() => TEAMS.filter(t => !t.isExhibition), []);

  // Initialize state from localStorage if available
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('currentPlayerId') || PLAYERS[0].id;
    }
    return PLAYERS[0].id;
  });

  const [soldPlayers, setSoldPlayers] = useState<SoldPlayer[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soldPlayers');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [skippedInRoundIds, setSkippedInRoundIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skippedInRoundIds');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [everSkippedIds, setEverSkippedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('everSkippedIds');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [teamBudgets, setTeamBudgets] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('teamBudgets');
      return saved ? JSON.parse(saved) : auctionTeams.reduce((acc, team) => ({ ...acc, [team.id]: team.budget }), {});
    }
    return auctionTeams.reduce((acc, team) => ({ ...acc, [team.id]: team.budget }), {});
  });

  const [currentBid, setCurrentBid] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'BIDDING' | 'SOLD' | 'SKIPPED' | 'FINISHED'>('IDLE');
  const [lastAction, setLastAction] = useState<'SOLD' | 'SKIPPED' | 'INITIAL'>('INITIAL');
  const [timer, setTimer] = useState(10);
  const [bidAnimating, setBidAnimating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showFinishedOverlay, setShowFinishedOverlay] = useState(false);

  const currentPlayer = useMemo(() => 
    PLAYERS.find(p => p.id === currentPlayerId) || null
  , [currentPlayerId]);

  const bgImage = PlaceHolderImages.find(img => img.id === 'ucl_bg');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('soldPlayers', JSON.stringify(soldPlayers));
    localStorage.setItem('teamBudgets', JSON.stringify(teamBudgets));
    localStorage.setItem('skippedInRoundIds', JSON.stringify(skippedInRoundIds));
    localStorage.setItem('everSkippedIds', JSON.stringify(everSkippedIds));
    if (currentPlayerId) localStorage.setItem('currentPlayerId', currentPlayerId);
  }, [soldPlayers, teamBudgets, skippedInRoundIds, everSkippedIds, currentPlayerId]);

  const handleNextPlayer = useCallback(() => {
    const triggerAction = status === 'SOLD' ? 'SOLD' : (status === 'SKIPPED' ? 'SKIPPED' : 'INITIAL');
    setLastAction(triggerAction);
    setCurrentBid(0);
    setSelectedTeamId(null);
    setTimer(10);

    const isSigned = (id: string) => soldPlayers.some(s => s.player.id === id);
    const currentIdx = PLAYERS.findIndex(p => p.id === currentPlayerId);
    let nextPlayer = PLAYERS.slice(currentIdx + 1).find(p => !isSigned(p.id) && !skippedInRoundIds.includes(p.id));

    if (nextPlayer) {
      setCurrentPlayerId(nextPlayer.id);
      setStatus('IDLE');
      return;
    }

    if (skippedInRoundIds.length > 0) {
      const nextId = skippedInRoundIds[0];
      setSkippedInRoundIds(prev => prev.slice(1));
      setCurrentPlayerId(nextId);
      setStatus('IDLE');
    } else {
      if (soldPlayers.length === PLAYERS.length || (skippedInRoundIds.length === 0 && !nextPlayer)) {
        setCurrentPlayerId(null);
        setStatus('FINISHED');
        setShowFinishedOverlay(true);
      }
    }
  }, [currentPlayerId, soldPlayers, skippedInRoundIds, status]);

  const handleSkip = useCallback(() => {
    if ((status === 'BIDDING' || status === 'IDLE') && currentPlayerId) {
      setSkippedInRoundIds(prev => [...prev, currentPlayerId]);
      if (!everSkippedIds.includes(currentPlayerId)) {
        setEverSkippedIds(prev => [...prev, currentPlayerId]);
      }
      setStatus('SKIPPED');
      setTimer(5);
    }
  }, [status, currentPlayerId, everSkippedIds]);

  const handleBid = useCallback((increment: number) => {
    if (status !== 'BIDDING' && status !== 'IDLE') return;

    const startPrice = currentBid === 0 ? (currentPlayer?.basePrice || 10) : currentBid;
    const newBid = startPrice + increment;

    if (selectedTeamId && teamBudgets[selectedTeamId] < newBid) {
      setErrorMsg("Budget Exceeded for " + auctionTeams.find(t => t.id === selectedTeamId)?.name);
      return;
    }

    setCurrentBid(newBid);
    setStatus('BIDDING');
    setTimer(10);
    setBidAnimating(true);
    setTimeout(() => setBidAnimating(false), 200);
    setErrorMsg(null);
  }, [currentBid, selectedTeamId, status, teamBudgets, currentPlayer, auctionTeams]);

  const handleSold = useCallback(() => {
    if ((status !== 'BIDDING' && status !== 'IDLE') || !currentPlayer) return;

    if (!selectedTeamId) {
      setErrorMsg("Please select a Franchise to sign the player!");
      return;
    }

    const finalPrice = currentBid === 0 ? (currentPlayer.basePrice || 10) : currentBid;

    if (teamBudgets[selectedTeamId] < finalPrice) {
      setErrorMsg("Budget Exceeded!");
      return;
    }

    const team = auctionTeams.find(t => t.id === selectedTeamId)!;
    setSoldPlayers(prev => [{ player: currentPlayer, team, price: finalPrice }, ...prev]);
    setTeamBudgets(prev => ({ ...prev, [selectedTeamId]: prev[selectedTeamId] - finalPrice }));
    setStatus('SOLD');
    setTimer(5);
  }, [currentBid, currentPlayer, selectedTeamId, status, teamBudgets, auctionTeams]);

  const handleFinishAuction = useCallback(() => {
    setStatus('FINISHED');
    setShowFinishedOverlay(true);
  }, []);

  const handleResetAuction = useCallback(() => {
    if (confirm("Are you sure you want to reset the entire auction? All progress will be lost.")) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleBid(10);
      if (e.key === '2') handleBid(50);
      if (e.key === '3') handleBid(100);
      if (e.key === 'Enter') handleSold();
      if (e.key === 'n' || e.key === 'N') (status === 'SOLD' || status === 'SKIPPED') && handleNextPlayer();
      if (e.key === 's' || e.key === 'S') (status === 'BIDDING' || status === 'IDLE') && handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBid, handleSold, handleNextPlayer, handleSkip, status]);

  useEffect(() => {
    if ((status === 'SOLD' || status === 'SKIPPED') && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && (status === 'SOLD' || status === 'SKIPPED')) {
      handleNextPlayer();
    }
  }, [status, timer, handleNextPlayer]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const unsoldPlayers = PLAYERS.filter(p => !soldPlayers.some(s => s.player.id === p.id));

  return (
    <div className="relative flex h-screen w-full bg-[#000411] text-white p-6 gap-6 font-headline overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image src={bgImage.imageUrl} alt="UCL Stadium" fill className="object-cover opacity-35 brightness-50" priority data-ai-hint={bgImage.imageHint} />
          <div className="absolute inset-0 ucl-gradient opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}

      {/* Franchises List */}
      <div className="w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar z-10">
        <div className="flex items-center justify-between mb-2 px-1">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
            <Trophy className="text-primary w-6 h-6 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-black tracking-tight text-primary">FRANCHISES</h2>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={handleResetAuction} title="Reset Progress">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        {auctionTeams.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeamId(team.id)}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all border-2 relative overflow-hidden group",
              selectedTeamId === team.id ? "bg-primary/10 border-primary glow-primary scale-[1.03] z-10" : "bg-card/40 backdrop-blur-md border-transparent hover:bg-muted/50"
            )}
          >
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 overflow-hidden p-1">
                   <img src={team.logoUrl} className="w-full h-full object-contain" alt={team.name} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{team.name}</h3>
                  <div className="flex flex-col gap-1 mt-1 text-[10px] text-muted-foreground font-black tracking-[0.2em]">
                    <div className="flex items-center gap-1"><Zap className="w-3 h-3 text-secondary" />BUDGET LEFT</div>
                    <div className="flex items-center gap-1"><Users className="w-3 h-3 text-primary" />SQUAD: {soldPlayers.filter(s => s.team.id === team.id).length}</div>
                  </div>
                </div>
              </div>
              <div className="text-xl font-black text-primary tabular-nums">₹{teamBudgets[team.id].toLocaleString()}</div>
            </div>
            <Progress value={(teamBudgets[team.id] / team.budget) * 100} className="h-1 mt-3 bg-white/5" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 relative z-10">
        <div className="flex justify-between items-center px-4 bg-white/5 backdrop-blur-md py-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">Status</span>
              <Badge className={cn("px-4 py-1 text-[10px] font-black uppercase rounded-full tracking-widest mt-1", status === 'BIDDING' ? "bg-primary text-black" : status === 'SOLD' ? "bg-secondary text-black" : status === 'SKIPPED' ? "bg-destructive text-white" : "bg-muted text-white/50")}>
                {status}
              </Badge>
            </div>
            {(status === 'BIDDING' || status === 'SOLD' || status === 'SKIPPED') && (
              <div className="flex flex-col">
                 <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">{status === 'BIDDING' ? 'Timer' : 'Next In'}</span>
                 <span className={cn("text-2xl font-black tabular-nums mt-1 flex items-center gap-2", status === 'BIDDING' ? "text-secondary" : "text-primary animate-pulse")}><Clock className="w-4 h-4" />00:{timer < 10 ? `0${timer}` : timer}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-10">
            <div className="text-right">
               <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">Progress</span>
               <div className="text-xl font-black text-white italic">{soldPlayers.length} <span className="text-xs text-muted-foreground not-italic ml-1">/ {PLAYERS.length} Signed</span></div>
            </div>
            <Button variant="outline" className="h-10 px-4 border-primary/50 bg-primary/10 hover:bg-primary hover:text-black transition-all rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl" onClick={handleFinishAuction}>
              <CheckCircle2 className="w-3.5 h-3.5 mr-2" />Finish Auction
            </Button>
          </div>
        </div>

        {/* The Legendary Player Card */}
        <div className="flex-1 flex gap-12 items-center justify-center">
          {currentPlayer ? (
            <div 
              key={currentPlayerId}
              className={cn(
                "relative aspect-[3/4.2] w-[340px] legendary-card-bg rounded-[2rem] p-0 shadow-2xl flex flex-col transition-all group overflow-hidden border-2 border-[#00ffd0]/30",
                lastAction === 'SOLD' ? "animate-card-spin" : lastAction === 'SKIPPED' ? "animate-in fade-in slide-in-from-right-20 duration-1000" : "animate-in fade-in zoom-in-95 slide-in-from-bottom-12 duration-1000"
              )}
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                <img 
                  src={currentPlayer.imageUrl} 
                  alt={currentPlayer.name} 
                  className="w-full h-full object-cover object-top" 
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-20" />
              </div>

              <div className="absolute top-8 left-8 z-30 flex flex-col items-start select-none pointer-events-none">
                <div className="flex items-center gap-4">
                  <div className="text-[2rem] font-black text-[#00ffd0] leading-[0.9] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] italic tracking-tighter">
                    {currentPlayer.rating}
                  </div>
                </div>
                <div className="h-[2px] w-12 bg-[#00ffd0]/40 my-1" />
                <div className="text-2xl font-black text-white italic tracking-tighter uppercase drop-shadow-md">
                  {currentPlayer.position === 'Forward' ? 'ST' : currentPlayer.position === 'Midfielder' ? 'CMF' : currentPlayer.position === 'Defender' ? 'DEF' : 'GKP'}
                </div>
              </div>

              <div className="absolute bottom-10 left-0 right-0 z-30 flex flex-col items-center px-6 select-none pointer-events-none">
                 <div className="text-[12px] font-black text-[#00ffd0] tracking-[0.4em] italic uppercase mb-1 drop-shadow-md">
                   {currentPlayer.nationality}
                 </div>
                 
                 <h1 className="text-[2rem] font-black text-white uppercase italic tracking-tighter drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] truncate w-full text-center leading-[1.1]">
                   {currentPlayer.name}
                 </h1>

                 <div className="mt-3 flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ffb800] text-[#ffb800] drop-shadow-[0_0_12px_rgba(255,184,0,0.6)]" />
                    ))}
                 </div>
              </div>

              {status === 'SOLD' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
                  <div className="text-center animate-sold flex flex-col items-center p-6">
                     <div className="text-8xl font-black text-secondary italic tracking-tighter drop-shadow-[0_0_50px_rgba(255,215,0,1)] uppercase">SOLD!</div>
                     <div className="text-sm mt-6 font-black text-white uppercase tracking-[0.2em] bg-primary/20 backdrop-blur-xl py-3 px-8 rounded-full border border-primary/40 shadow-2xl">
                        To {auctionTeams.find(t => t.id === selectedTeamId)?.name}
                     </div>
                  </div>
                </div>
              )}

              {status === 'SKIPPED' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
                  <div className="text-center animate-sold flex flex-col items-center p-6">
                     <div className="text-7xl font-black text-destructive italic tracking-tighter drop-shadow-[0_0_50px_rgba(255,0,0,0.8)] uppercase">SKIPPED</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
             <div className="text-center p-12 bg-white/5 backdrop-blur-3xl rounded-[2rem] border-2 border-dashed border-white/10 opacity-50">
                <Trophy className="w-20 h-20 text-secondary mx-auto mb-6 opacity-20" />
                <h2 className="text-2xl font-black uppercase tracking-widest italic">Auction Complete</h2>
             </div>
          )}

          <div className={cn("flex-1 flex flex-col justify-center items-center gap-8 max-w-sm transition-all duration-500", (!currentPlayer || status === 'SOLD' || status === 'SKIPPED') && "opacity-20 pointer-events-none")}>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black mb-2 opacity-60">Current Bid</div>
                <div className={cn("text-[6.5rem] font-black tracking-tighter leading-none text-primary transition-all duration-150 tabular-nums drop-shadow-[0_0_40px_rgba(0,212,255,0.4)]", bidAnimating && "animate-bid")}>
                  ₹{currentBid > 0 ? currentBid.toLocaleString() : (currentPlayer?.basePrice || "10")}
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-12 text-lg font-black border-white/10 hover:bg-primary hover:text-black transition-all" onClick={() => handleBid(10)}>+10</Button>
                  <Button variant="outline" className="h-12 text-lg font-black border-white/10 hover:bg-primary hover:text-black transition-all" onClick={() => handleBid(50)}>+50</Button>
                  <Button variant="outline" className="h-12 text-lg font-black border-white/10 hover:bg-primary hover:text-black transition-all" onClick={() => handleBid(100)}>+100</Button>
                </div>
                <Button 
                  variant="secondary" 
                  className={cn(
                    "h-16 text-xl font-black uppercase tracking-tighter shadow-2xl transition-all duration-300 rounded-2xl border-none", 
                    selectedTeamId ? "glow-accent bg-secondary text-black" : "bg-muted text-white/30 cursor-not-allowed"
                  )} 
                  onClick={handleSold}
                >
                  SIGN PLAYER
                </Button>
                <Button variant="outline" className="h-12 text-[10px] font-black uppercase tracking-[0.2em] border-white/10 hover:bg-destructive hover:text-white transition-all rounded-xl" onClick={handleSkip}><SkipForward className="w-3 h-3 mr-2" />Skip Player (S)</Button>
              </div>
          </div>
        </div>
        {errorMsg && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[100] bg-destructive text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl animate-in slide-in-from-top duration-500">
            <AlertCircle className="w-6 h-6" /><span className="text-sm font-black uppercase tracking-widest">{errorMsg}</span>
          </div>
        )}
        {showFinishedOverlay && (
           <div className="absolute inset-0 z-[101] bg-[#000411]/95 backdrop-blur-3xl flex items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-500 overflow-hidden">
              <div className="max-w-7xl w-full flex flex-col items-center h-full max-h-[92vh]">
                <div className="flex flex-col items-center mb-6 shrink-0">
                  <div className="relative inline-block mb-3">
                    <Trophy className="w-14 h-14 text-secondary drop-shadow-[0_0_50px_rgba(255,215,0,0.6)]" />
                    <Star className="absolute -top-2 -right-2 w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter italic text-white uppercase leading-none">AUCTION SUMMARY</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 w-full mb-8 shrink-0 px-4">
                   <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md flex flex-col items-center">
                      <div className="text-muted-foreground text-[9px] font-black uppercase tracking-[0.3em] mb-1">Total Lots</div>
                      <div className="text-3xl font-black text-primary italic tabular-nums leading-none">{PLAYERS.length}</div>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md flex flex-col items-center">
                      <div className="text-muted-foreground text-[9px] font-black uppercase tracking-[0.3em] mb-1">Players Signed</div>
                      <div className="text-3xl font-black text-secondary italic tabular-nums leading-none">{soldPlayers.length}</div>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md flex flex-col items-center">
                      <div className="text-muted-foreground text-[9px] font-black uppercase tracking-[0.3em] mb-1">Total Remaining</div>
                      <div className="text-3xl font-black text-destructive italic tabular-nums leading-none">{unsoldPlayers.length}</div>
                   </div>
                </div>
                <div className="w-full flex-1 min-h-0 flex flex-col px-4 overflow-hidden">
                   <h3 className="text-left text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 flex items-center gap-3 px-2 shrink-0"><LayoutDashboard className="w-4 h-4" />Franchise Squads</h3>
                   <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0 pb-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                       {auctionTeams.map(team => {
                          const teamPlayers = soldPlayers.filter(s => s.team.id === team.id);
                          const totalSpent = teamPlayers.reduce((sum, p) => sum + p.price, 0);
                          return (
                            <div key={team.id} className="bg-card/90 border-2 border-white/10 rounded-2xl flex flex-col shadow-2xl relative overflow-hidden group hover:border-primary transition-all h-[320px]">
                              <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                              <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
                                 <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 p-1.5 bg-white rounded-lg border border-white/10 flex items-center justify-center shrink-0 shadow-lg"><img src={team.logoUrl} className="w-full h-full object-contain" alt="" /></div>
                                    <div className="flex flex-col min-w-0">
                                      <span className="font-black text-sm uppercase tracking-tight text-white leading-tight block truncate">{team.name}</span>
                                      <span className="text-[8px] font-black text-primary uppercase tracking-widest">{teamPlayers.length} Players</span>
                                    </div>
                                 </div>
                                 <div className="text-right shrink-0">
                                    <div className="flex items-center gap-1 justify-end text-[7px] font-black text-muted-foreground uppercase tracking-widest mb-0.5"><Wallet className="w-2.5 h-2.5" /><span>Total Spent</span></div>
                                    <div className="text-lg font-black text-secondary tabular-nums leading-none">₹{totalSpent.toLocaleString()}</div>
                                 </div>
                              </div>
                              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
                                {teamPlayers.length > 0 ? (
                                  teamPlayers.map((s, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                      <div className="flex items-center gap-2 min-w-0"><span className="text-[9px] font-black text-primary/60 tabular-nums">0{i+1}</span><span className="text-white text-[10px] font-bold uppercase tracking-wide truncate">{s.player.name}</span></div>
                                      <span className="text-secondary font-black text-[10px] shrink-0 ml-3 tabular-nums">₹{s.price}</span>
                                    </div>
                                  ))
                                ) : (
                                  <div className="h-full flex flex-col items-center justify-center opacity-30 px-4">
                                     <div className="text-[9px] font-black uppercase tracking-[0.2em] italic text-center border-2 border-dashed border-white/10 p-6 rounded-xl w-full">No signings made</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                       })}
                     </div>
                   </div>
                </div>
                <div className="flex gap-4 mt-6 shrink-0 pb-4">
                  <Button variant="outline" size="lg" className="h-14 px-10 text-xs font-black rounded-xl uppercase tracking-[0.2em] border-white/20 hover:bg-white/10" onClick={() => setShowFinishedOverlay(false)}><X className="w-4 h-4 mr-3" />Close & Review</Button>
                  <Button variant="default" size="lg" className="h-14 px-14 text-xs font-black rounded-xl uppercase tracking-[0.2em] glow-primary bg-primary text-black hover:scale-105" onClick={handleResetAuction}><RotateCcw className="w-5 h-5 mr-3" />Reset Auction</Button>
                </div>
              </div>
           </div>
        )}
      </div>

      <div className="w-1/4 flex flex-col gap-4 overflow-hidden z-10">
        <Tabs defaultValue="sold" className="w-full flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/20 backdrop-blur-xl border border-white/5 p-1 mb-3 rounded-xl">
            <TabsTrigger value="sold" className="font-black uppercase tracking-widest text-[9px] data-[state=active]:bg-secondary data-[state=active]:text-black rounded-lg transition-all"><History className="w-3.5 h-3.5 mr-2" />SIGNED</TabsTrigger>
            <TabsTrigger value="unsold" className="font-black uppercase tracking-widest text-[9px] data-[state=active]:bg-primary data-[state=active]:text-black rounded-lg transition-all"><History className="w-3.5 h-3.5 mr-2" />POOL</TabsTrigger>
          </TabsList>
          <TabsContent value="sold" className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
            {soldPlayers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center px-8"><UserCheck className="w-16 h-16 mb-4" /><p className="font-black text-sm tracking-widest uppercase">No Signings</p></div>
            ) : soldPlayers.map((sold, idx) => (
              <div key={idx} className="bg-card/40 backdrop-blur-md p-3 rounded-xl border border-white/5 flex gap-4 hover:bg-muted/40 transition-colors">
                <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0 border border-white/10"><img src={sold.player.imageUrl} className="w-full h-full object-cover" alt="" /></div>
                <div className="flex-1 min-w-0">
                   <div className="font-black text-sm truncate uppercase italic leading-none mb-1">{sold.player.name}</div>
                   <div className="text-[9px] font-black text-primary mb-1.5 uppercase tracking-widest opacity-80 truncate">{sold.team.name}</div>
                   <div className="text-lg font-black text-secondary tabular-nums">₹{sold.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="unsold" className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2">
            {unsoldPlayers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center px-8"><Star className="w-16 h-16 mb-4" /><p className="font-black text-sm tracking-widest uppercase">Pool Exhausted</p></div>
            ) : unsoldPlayers.map((player) => (
              <div key={player.id} className={cn("bg-card/20 backdrop-blur-sm p-2.5 rounded-lg border border-white/5 flex items-center gap-3 transition-all", everSkippedIds.includes(player.id) || currentPlayerId === player.id ? "opacity-100 border-destructive/20 bg-destructive/5" : "opacity-70 hover:opacity-100")}>
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0 border border-white/10"><img src={player.imageUrl} className="w-full h-full object-cover" alt="" /></div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2">
                     <div className="font-black text-xs truncate uppercase tracking-tight">{player.name}</div>
                     {everSkippedIds.includes(player.id) && <Badge variant="destructive" className="text-[7px] py-0 px-1 h-3.5">Skipped</Badge>}
                   </div>
                   <div className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                    {player.position === 'Forward' ? 'ST' : player.position === 'Midfielder' ? 'CMF' : player.position === 'Defender' ? 'DEF' : 'GKP'}
                   </div>
                </div>
                <div className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-md border border-primary/20">{player.rating}</div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 212, 255, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 212, 255, 0.4); }
      `}</style>
    </div>
  );
}
