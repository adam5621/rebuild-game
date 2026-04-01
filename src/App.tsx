import { useState, useEffect } from 'react';
import { MARKET, MANAGERS, POSITIONS, SCENARIOS, FINANCIALS, TEAMS } from './data';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Player = {
  id: number;
  name: string;
  budget: number;
  squad: Record<string, any>;
  manager: any | null;
  scenarios: any[];
  financials: any[];
  status: 'KEEP' | 'SELL' | 'PENDING';
  targetId: number | null;
};

type Log = { msg: string, type: 'info' | 'success' | 'danger' };

export default function App() {
  // --- Game State ---
  const [phase, setPhase] = useState<'LOBBY' | 'NAME_INPUT' | 'REVEAL_CARDS' | 'ROUND_DECISION' | 'ROUND_MARKET' | 'BIDDING' | 'INTERMISSION' | 'TRADING' | 'SUMMARY'>('LOBBY');
  const [playerCount, setPlayerCount] = useState(2);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']);
  const [players, setPlayers] = useState<Player[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  
  // Progress State
  const [roundNumber, setRoundNumber] = useState(0); // 0=Manager, 1-5=Pos, 6-11=Pos
  const [usedPositions, setUsedPositions] = useState<string[]>([]);
  
  // Round State
  const [roundType, setRoundType] = useState<'MANAGER' | 'POSITION'>('MANAGER');
  const [activePosition, setActivePosition] = useState<string | null>(null);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0); 
  const [marketOptions, setMarketOptions] = useState<any[]>([]);
  
  // Buying Logic
  const [buyersQueue, setBuyersQueue] = useState<number[]>([]);
  const [conflicts, setConflicts] = useState<number[]>([]);

  // Bidding State
  const [bidItem, setBidItem] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [currentBidderId, setCurrentBidderId] = useState<number>(0);

  // --- Effects ---
  useEffect(() => {
    if (logs.length > 0) {
      const timer = setTimeout(() => setLogs(prev => prev.slice(0, -1)), 1000); // 1 Second Dismiss
      return () => clearTimeout(timer);
    }
  }, [logs]);

  // --- Core Logic ---

  const addLog = (msg: string, type: 'info' | 'success' | 'danger' = 'info') => {
    setLogs(prev => [{ msg, type }, ...prev]);
  };

  const startGame = () => {
    setPhase('NAME_INPUT');
  };

  const confirmNames = () => {
    const team = selectedTeam || TEAMS[Math.floor(Math.random() * TEAMS.length)];
    const newPlayers = Array.from({ length: playerCount }).map((_, i) => ({
      id: i + 1,
      name: playerNames[i] || `Player ${i + 1}`,
      budget: team.budget,
      squad: { ...team.roster },
      manager: { ...team.manager },
      scenarios: [],
      financials: [],
      status: 'PENDING' as 'PENDING',
      targetId: null
    }));
    setPlayers(newPlayers);
    setPhase('REVEAL_CARDS');
  };

  const drawCard = (pIndex: number) => {
    const scen = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    const fin = FINANCIALS[Math.floor(Math.random() * FINANCIALS.length)];
    
    setPlayers(prev => prev.map((p, i) => {
        if (i !== pIndex) return p;
        let newBudget = p.budget;
        if (fin.value) newBudget += fin.value;
        return { 
            ...p, 
            scenarios: [...p.scenarios, scen], 
            financials: [...p.financials, fin], 
            budget: newBudget 
        };
    }));
  };

  const startManagerRound = () => {
    setRoundType('MANAGER');
    setActivePosition(null);
    setMarketOptions(MANAGERS);
    setActivePlayerIndex(0);
    setPhase('ROUND_DECISION');
    setRoundNumber(0);
    setPlayers(prev => prev.map(p => ({ ...p, status: 'PENDING', targetId: null })));
  };

  const advanceGame = () => {
      if (roundNumber === 0) {
          setRoundNumber(1);
          pickNextPosition();
      } else if (roundNumber === 5) {
          setPhase('INTERMISSION');
      } else if (roundNumber === 11) {
          setPhase('TRADING');
      } else {
          setRoundNumber(prev => prev + 1);
          pickNextPosition();
      }
  };

  const pickNextPosition = () => {
    const available = POSITIONS.filter(p => !usedPositions.includes(p));
    if (available.length === 0) {
        setPhase('TRADING');
        return;
    }

    const pos = available[Math.floor(Math.random() * available.length)];
    setUsedPositions(prev => [...prev, pos]);
    
    setRoundType('POSITION');
    setActivePosition(pos);
    
    const pool = MARKET[pos as keyof typeof MARKET] || [];
    setMarketOptions([...pool].sort(() => 0.5 - Math.random()).slice(0, 3));
    
    setActivePlayerIndex(0);
    setPhase('ROUND_DECISION');
    setPlayers(prev => prev.map(p => ({ ...p, status: 'PENDING', targetId: null })));
  };

  const makeDecision = (sell: boolean) => {
    const pIdx = activePlayerIndex;
    const player = players[pIdx];
    const asset = roundType === 'MANAGER' ? player.manager : player.squad[activePosition!];
    const value = asset?.value || (roundType === 'MANAGER' ? 2 : 10);

    if (sell) {
        addLog(`${player.name} SOLD ${asset?.name || 'Asset'} (+€${value}M)`, 'danger');
        setPlayers(prev => prev.map((p, i) => i === pIdx ? { ...p, budget: p.budget + value, status: 'SELL' } : p));
    } else {
        addLog(`${player.name} KEPT ${asset?.name || 'Asset'}`, 'success');
        setPlayers(prev => prev.map((p, i) => i === pIdx ? { ...p, status: 'KEEP' } : p));
    }

    if (activePlayerIndex < playerCount - 1) {
        setActivePlayerIndex(prev => prev + 1);
    } else {
        // Prepare Market Phase
        const sellers = players.filter((p, i) => (i === pIdx ? (sell ? true : false) : p.status === 'SELL')).map(p => p.id);
        
        if (sellers.length > 0) {
            setBuyersQueue(sellers);
            setActivePlayerIndex(players.findIndex(p => p.id === sellers[0]));
            setPhase('ROUND_MARKET');
        } else {
            addLog("Everyone kept their players!", 'info');
            setPhase('ROUND_MARKET'); // Show next button
        }
    }
  };

  const selectMarketTarget = (targetItem: any) => {
    const currentPlayer = players[activePlayerIndex];
    if (currentPlayer.status !== 'SELL') return;

    setPlayers(prev => prev.map((p, i) => i === activePlayerIndex ? { ...p, targetId: targetItem.id } : p));

    const currentQueueIdx = buyersQueue.indexOf(currentPlayer.id);
    if (currentQueueIdx < buyersQueue.length - 1) {
        const nextPlayerId = buyersQueue[currentQueueIdx + 1];
        setActivePlayerIndex(players.findIndex(p => p.id === nextPlayerId));
    } else {
        resolveMarket();
    }
  };

  const resolveMarket = () => {
    const activeBuyers = players.filter(p => buyersQueue.includes(p.id));
    const targets = activeBuyers.map(p => p.targetId);
    
    if (targets.some(t => t === null)) return;

    const uniqueTargets = new Set(targets);
    
    if (uniqueTargets.size === targets.length) {
        autoBuyAll(activeBuyers);
    } else {
        const conflictTargetId = targets.find(t => targets.indexOf(t) !== targets.lastIndexOf(t));
        const fighters = activeBuyers.filter(p => p.targetId === conflictTargetId).map(p => p.id);
        
        setConflicts(fighters);
        const item = marketOptions.find(m => m.id === conflictTargetId);
        setBidItem(item);
        setCurrentBidderId(fighters[0]);
        setBidAmount(item.value);
        setPhase('BIDDING');
    }
  };

  const autoBuyAll = (buyers: Player[]) => {
     setPlayers(prev => prev.map(p => {
         const buyer = buyers.find(b => b.id === p.id);
         if (!buyer || !buyer.targetId) return p;

         const item = marketOptions.find(m => m.id === buyer.targetId);
         const newSquad = { ...p.squad };
         if (activePosition) newSquad[activePosition] = item;
         
         return {
             ...p,
             budget: p.budget - (item.value || item.cost),
             squad: newSquad,
             manager: !activePosition ? item : p.manager,
             status: 'KEEP',
             targetId: null
         };
     }));
     setBuyersQueue([]);
     addLog("All purchases successful!", 'success');
  };

  const submitBid = (amount: number) => {
      const fighterIndex = conflicts.indexOf(currentBidderId);
      const nextFighterId = conflicts[(fighterIndex + 1) % conflicts.length];
      setCurrentBidderId(nextFighterId);
      setBidAmount(amount);
      addLog(`Bid raised to €${amount}M`, 'info');
  };

  const foldBid = () => {
      const fighterIndex = conflicts.indexOf(currentBidderId);
      const winnerId = conflicts[(fighterIndex + 1) % conflicts.length];
      const winner = players.find(p => p.id === winnerId);
      
      addLog(`${winner?.name} wins ${bidItem.name}!`, 'success');

      setPlayers(prev => prev.map(p => {
          if (p.id === winnerId) {
             const newSquad = { ...p.squad };
             if (activePosition) newSquad[activePosition] = bidItem;
             return { ...p, budget: p.budget - bidAmount, squad: newSquad, manager: !activePosition ? bidItem : p.manager, status: 'KEEP', targetId: null };
          }
          if (p.id === currentBidderId) {
             return { ...p, targetId: null };
          }
          return p;
      }));

      setPhase('ROUND_MARKET');
      setConflicts([]);
      setBuyersQueue([currentBidderId]);
      setActivePlayerIndex(players.findIndex(p => p.id === currentBidderId));
  };

  // --- Render ---

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-4 md:p-8 pb-32">
       {/* Logs */}
       <div className="fixed top-4 right-4 z-50 w-80 space-y-2 pointer-events-none">
          <AnimatePresence>
            {logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    className={cn("p-3 rounded shadow-lg text-sm border-l-4 bg-slate-900/90 backdrop-blur", log.type === 'danger' ? 'border-red-500' : log.type === 'success' ? 'border-emerald-500' : 'border-blue-500')}>
                    {log.msg}
                </motion.div>
            ))}
          </AnimatePresence>
       </div>

       {/* Phase: INTERMISSION */}
       {phase === 'INTERMISSION' && (
           <div className="max-w-4xl mx-auto mt-20 text-center">
               <h2 className="text-5xl font-black text-brand mb-8">MID-SEASON TWIST! 🌪️</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {players.map((p, i) => (
                       <div key={p.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                           <h3 className="text-xl font-bold mb-4">{p.name}</h3>
                           {p.scenarios.length < 2 ? (
                               <button onClick={() => drawCard(i)} className="bg-brand text-slate-900 px-6 py-3 rounded-lg font-bold w-full">Draw Twist Cards</button>
                           ) : (
                               <div className="text-left bg-slate-800 p-4 rounded-lg">
                                   <div className="text-emerald-400 font-bold">New: {p.scenarios[1].title}</div>
                                   <div className="text-xs text-slate-400">{p.scenarios[1].desc}</div>
                                   <div className="text-white font-bold mt-2">New: {p.financials[1].title}</div>
                                   <div className="text-xs text-slate-400">{p.financials[1].effect}</div>
                               </div>
                           )}
                       </div>
                   ))}
               </div>
               {players.every(p => p.scenarios.length === 2) && (
                   <button onClick={() => { setRoundNumber(6); pickNextPosition(); }} className="mt-12 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-xl">
                       Start Second Half &rarr;
                   </button>
               )}
           </div>
       )}

       {/* Phase: TRADING / SUMMARY */}
       {phase === 'TRADING' && (
           <div className="max-w-4xl mx-auto mt-20 text-center">
               <h2 className="text-5xl font-black text-white mb-4">SEASON COMPLETE! 🏁</h2>
               <p className="text-xl text-slate-400 mb-8">Trading Window (Coming Soon)</p>
               <button onClick={() => setPhase('SUMMARY')} className="bg-brand text-slate-900 px-8 py-3 rounded-lg font-bold">Calculate Scores</button>
           </div>
       )}

       {phase === 'SUMMARY' && (
           <div className="max-w-6xl mx-auto mt-10">
               <h2 className="text-4xl font-black text-center mb-12">FINAL STANDINGS 🏆</h2>
               <div className="grid gap-8">
                   {players.sort((a,b) => {
                       const scoreA = Object.values(a.squad).reduce((acc: number, pl: any) => acc + (pl.rating || 0), 0) + (a.manager?.bonus || 0) + Math.floor(a.budget/10);
                       const scoreB = Object.values(b.squad).reduce((acc: number, pl: any) => acc + (pl.rating || 0), 0) + (b.manager?.bonus || 0) + Math.floor(b.budget/10);
                       return scoreB - scoreA;
                   }).map((p, index) => {
                       const squadRating = Object.values(p.squad).reduce((acc: number, pl: any) => acc + (pl.rating || 0), 0);
                       const managerBonus = p.manager?.bonus || 0;
                       const budgetScore = Math.floor(p.budget / 10);
                       const total = squadRating + managerBonus + budgetScore;
                       
                       return (
                           <div key={p.id} className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
                               <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                                   <div className="flex items-center gap-4">
                                       <div className="text-4xl font-black text-slate-700">#{index + 1}</div>
                                       <div>
                                           <h3 className="text-2xl font-bold text-brand">{p.name}</h3>
                                           <div className="text-sm text-slate-400">Budget: €{p.budget}M • Bonus: +{budgetScore}pts</div>
                                       </div>
                                   </div>
                                   <div className="text-5xl font-black">{total} <span className="text-sm font-normal text-slate-500">pts</span></div>
                               </div>
                               
                               {/* Full Squad Display */}
                               <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                   <div className="col-span-1 bg-brand/10 border border-brand/20 p-2 rounded-lg">
                                       <div className="text-[10px] uppercase font-bold text-brand">Manager</div>
                                       <div className="font-bold truncate">{p.manager?.name}</div>
                                       <div className="text-xs text-brand">+{p.manager?.bonus} Bonus</div>
                                   </div>
                                   {POSITIONS.map(pos => {
                                       const pl = p.squad[pos];
                                       return pl ? (
                                           <div key={pos} className="bg-slate-950 border border-slate-800 p-2 rounded-lg">
                                               <div className="text-[10px] uppercase font-bold text-slate-500">{pos}</div>
                                               <div className="font-bold text-sm truncate" title={pl.name}>{pl.name}</div>
                                               <div className="text-xs text-emerald-400 font-mono">{pl.rating || '?'}</div>
                                           </div>
                                       ) : null;
                                   })}
                               </div>
                           </div>
                       );
                   })}
               </div>
           </div>
       )}

       {/* --- LOBBY --- */}
       {phase === 'LOBBY' && (
         <div className="max-w-4xl mx-auto mt-20 text-center space-y-8">
            <h1 className="text-6xl font-black text-brand tracking-tighter">REBUILD<br/><span className="text-white text-4xl">GAME ENGINE v2.4</span></h1>
            
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-8 text-left">
                <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase">Number of Players</label>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map(n => (
                            <button key={n} onClick={() => setPlayerCount(n)}
                                className={cn("flex-1 py-4 rounded-xl font-bold text-xl transition-all", playerCount === n ? "bg-brand text-slate-900 shadow-lg shadow-brand/20" : "bg-slate-800 text-slate-500 hover:bg-slate-700")}>
                                {n}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase">Select Starting Team</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {TEAMS.map(t => (
                            <button key={t.name} onClick={() => setSelectedTeam(t)}
                                className={cn("p-4 rounded-xl text-sm border transition-all flex flex-col items-center gap-3 hover:scale-105", selectedTeam?.name === t.name ? "border-brand bg-brand/10 text-white" : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500")}>
                                <img src={t.image} className="w-12 h-12 object-contain" />
                                <span className="font-bold text-center">{t.name}</span>
                                <span className="text-xs bg-slate-950 px-2 py-1 rounded text-emerald-400">€{t.budget}M</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={startGame} disabled={!selectedTeam} className="w-full bg-brand text-slate-900 font-bold py-6 rounded-xl text-2xl hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand/10">
                    NEXT: ENTER NAMES &rarr;
                </button>
            </div>
         </div>
       )}

       {phase === 'NAME_INPUT' && (
         <div className="max-w-2xl mx-auto mt-20 text-center space-y-8">
            <h2 className="text-4xl font-black text-brand">WHO IS PLAYING?</h2>
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-6">
                {Array.from({ length: playerCount }).map((_, i) => (
                    <div key={i} className="text-left">
                        <label className="block text-slate-400 text-sm font-bold mb-2 uppercase">Player {i + 1} Name</label>
                        <input 
                            type="text" 
                            placeholder={`Enter name for Player ${i + 1}`}
                            value={playerNames[i]}
                            onChange={(e) => {
                                const newNames = [...playerNames];
                                newNames[i] = e.target.value;
                                setPlayerNames(newNames);
                            }}
                            className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl focus:border-brand focus:outline-none font-bold text-lg"
                        />
                    </div>
                ))}
                <button onClick={confirmNames} className="w-full bg-brand text-slate-900 font-bold py-6 rounded-xl text-2xl hover:scale-[1.01] transition-transform shadow-xl shadow-brand/10 mt-4">
                    START SEASON &rarr;
                </button>
            </div>
         </div>
       )}

       {phase === 'REVEAL_CARDS' && (
         <div className="max-w-6xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">Opening Hand</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {players.map((p, i) => (
                    <div key={p.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
                        <h3 className="text-2xl font-bold mb-6">{p.name}</h3>
                        {p.scenarios.length === 0 ? (
                            <button onClick={() => drawCard(i)} className="group relative bg-slate-800 hover:bg-slate-700 text-brand px-6 py-12 rounded-xl border-2 border-dashed border-slate-700 w-full overflow-hidden">
                                <span className="relative z-10 font-bold text-lg group-hover:scale-110 transition-transform block">REVEAL CARDS 🃏</span>
                            </button>
                        ) : (
                            <div className="space-y-4 w-full">
                                {/* Scenario Card */}
                                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-brand text-left shadow-lg">
                                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Objective</div>
                                    <div className="font-bold text-lg leading-tight text-white">{p.scenarios[0]?.title}</div>
                                    <div className="text-sm text-slate-400 mt-1">{p.scenarios[0]?.desc}</div>
                                </div>
                                
                                {/* Financial Card */}
                                <div className={cn("bg-slate-800 p-4 rounded-xl border-l-4 text-left shadow-lg", p.financials[0]?.value >= 0 ? "border-emerald-500" : "border-red-500")}>
                                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Financial Event</div>
                                    <div className="font-bold text-lg text-white">{p.financials[0]?.title}</div>
                                    <div className="text-sm font-mono mt-1">{p.financials[0]?.effect}</div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Total Budget</span>
                                    <span className="text-brand font-black text-2xl">€{p.budget}M</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Always visible but disabled until ready to prevent stuck state */}
            <div className="text-center mt-12 pb-12">
                <button 
                    onClick={startManagerRound} 
                    disabled={!players.every(p => p.scenarios.length > 0)}
                    className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg shadow-white/10 disabled:opacity-30 disabled:cursor-not-allowed">
                    Begin Manager Round &rarr;
                </button>
            </div>
         </div>
       )}

       {(phase === 'ROUND_DECISION' || phase === 'ROUND_MARKET' || phase === 'BIDDING') && (
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-4">
                {players.map((p, i) => (
                    <div key={p.id} className={cn("p-4 rounded-xl border-2 transition-all", 
                        i === activePlayerIndex && phase !== 'BIDDING' && phase !== 'ROUND_MARKET' ? "border-brand bg-brand/5 shadow-brand/10 shadow-lg" : "border-slate-800 bg-slate-900 opacity-60")}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">{p.name}</span>
                            <span className="font-mono text-emerald-400 font-bold">€{p.budget}M</span>
                        </div>
                    </div>
                ))}
                <div className="bg-slate-800 p-4 rounded-xl text-center">
                    <span className="text-xs text-slate-500 uppercase font-bold">Round</span>
                    <div className="text-2xl font-bold">{roundNumber}/11</div>
                </div>
            </div>

            {/* Main Stage */}
            <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl p-8 min-h-[600px] flex flex-col items-center justify-center relative shadow-2xl">
                
                {/* Header */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start border-b border-slate-800">
                    <div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Current Phase</div>
                        <div className="text-xl font-bold">{roundType === 'MANAGER' ? 'Manager Selection' : `Position: ${activePosition}`}</div>
                    </div>
                     {buyersQueue.length === 0 && phase === 'ROUND_MARKET' && (
                        <button onClick={advanceGame} className="bg-brand text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400">
                            {roundNumber === 5 ? "Go to Intermission" : "Next Round"} &rarr;
                        </button>
                    )}
                </div>

                {/* PHASE: DECISION */}
                {phase === 'ROUND_DECISION' && (
                    <div className="text-center space-y-8 mt-12 w-full max-w-2xl">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-4xl border-4 border-slate-700">
                            {roundType === 'MANAGER' ? '👔' : '⚽'}
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-2"><span className="text-brand">{players[activePlayerIndex].name}</span></h2>
                            <p className="text-xl text-slate-400">Do you want to sell:</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center justify-between">
                            <div className="text-left">
                                <div className="text-sm text-slate-500 uppercase">Current Asset</div>
                                <div className="text-2xl font-bold">{roundType === 'MANAGER' ? players[activePlayerIndex].manager?.name : players[activePlayerIndex].squad[activePosition!]?.name}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-500 uppercase">Value</div>
                                <div className="text-2xl font-mono text-emerald-400">€{roundType === 'MANAGER' ? players[activePlayerIndex].manager?.value : players[activePlayerIndex].squad[activePosition!]?.value}M</div>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center mt-8">
                            <button onClick={() => makeDecision(true)} className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-xl">SELL</button>
                            <button onClick={() => makeDecision(false)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xl">KEEP</button>
                        </div>
                    </div>
                )}

                {/* PHASE: MARKET */}
                {phase === 'ROUND_MARKET' && (
                    <div className="w-full mt-12">
                        {buyersQueue.length > 0 ? (
                             <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2"><span className="text-brand">{players[activePlayerIndex].name}</span> is selecting a target...</h3>
                             </div>
                        ) : (
                            <div className="text-center mb-8 text-slate-500">Round complete. No active buyers.</div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {marketOptions.map((opt) => (
                                <div key={opt.id} onClick={() => selectMarketTarget(opt)} 
                                    className={cn("bg-slate-800 border border-slate-700 p-6 rounded-2xl relative overflow-hidden transition-all group",
                                        buyersQueue.length > 0 ? "hover:border-brand cursor-pointer hover:-translate-y-1" : "opacity-50 grayscale")}>
                                    <div className="absolute top-0 right-0 bg-slate-950 text-white font-bold px-4 py-2 rounded-bl-xl border-l border-b border-slate-700">€{opt.value || opt.cost}M</div>
                                    <div className="text-sm text-slate-400 uppercase mb-2 tracking-wider">{opt.club || opt.style}</div>
                                    <h3 className="text-2xl font-bold mb-4">{opt.name}</h3>
                                    <div className="flex items-end justify-between">
                                        <div className="text-5xl font-black text-slate-700 group-hover:text-white transition-colors">{opt.rating || `+${opt.bonus}`}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PHASE: BIDDING */}
                {phase === 'BIDDING' && bidItem && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center">
                        <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-lg w-full shadow-2xl relative">
                            <h2 className="text-3xl font-bold mb-2 text-center text-white">{bidItem.name}</h2>
                            <p className="text-center text-slate-400 mb-8">Current High Bid: <span className="text-emerald-400 font-mono text-2xl">€{bidAmount}M</span></p>
                            <div className="bg-slate-800 p-6 rounded-xl mb-8 border border-slate-700">
                                <div className="text-center mb-4 text-sm text-slate-500 uppercase">Current Turn</div>
                                <div className="text-3xl font-bold text-brand text-center">{players.find(p => p.id === currentBidderId)?.name}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => submitBid(bidAmount + 1)} className="bg-brand text-slate-900 font-bold py-4 rounded-xl hover:scale-105 transition-transform">Raise Bid (€{bidAmount + 1}M)</button>
                                <button onClick={foldBid} className="bg-slate-800 text-red-400 font-bold py-4 rounded-xl border border-slate-700 hover:bg-slate-700">FOLD</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
         </div>
       )}
    </div>
  );
}
