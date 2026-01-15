import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';

const StatsCard = () => {
  const { level, xp } = useGamification();
  
  // Calculate progress to next level
  // Level N starts at 100 * (N-1)^2 XP
  // Level N+1 starts at 100 * N^2 XP
  const currentLevelBaseXP = 100 * Math.pow(level - 1, 2);
  const nextLevelBaseXP = 100 * Math.pow(level, 2);
  const xpNeeded = nextLevelBaseXP - currentLevelBaseXP;
  const currentProgress = xp - currentLevelBaseXP;
  const progressPercent = Math.min(100, Math.max(0, (currentProgress / xpNeeded) * 100));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-black/40 backdrop-blur-xl rounded-3xl pl-10 pr-8 py-8 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/5 relative group"
    >
      {/* Subtle Glow Effect behind Trophy */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/15 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-yellow-400/25 transition-colors duration-500" />
      </div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-start gap-6">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center justify-center flex-shrink-0 -mt-16 border-4 border-[#050505] backdrop-blur-md"
          >
            <Trophy size={32} strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-black leading-tight text-white drop-shadow-lg">
              Level {level}
            </h2>
            <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">Mastering Consistency</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-purple-400 font-bold bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20">
            <Star size={18} fill="currentColor" />
            <span>{currentProgress} / {xpNeeded} XP</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 z-10">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500 z-10 relative">
        <span>{currentProgress} / {xpNeeded} XP to Level {level + 1}</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
