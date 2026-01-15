import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';

const Journal = () => {
  const { analyzeJournal } = useGamification();
  const [entry, setEntry] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleAnalyze = () => {
    if (!entry.trim()) return;
    
    const result = analyzeJournal(entry);
    setFeedback(result);
    setEntry('');
    
    // Clear feedback after 5 seconds
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black/40 backdrop-blur-xl rounded-3xl pl-10 pr-8 py-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/5 h-full flex flex-col relative"
    >
       {/* Glow Effect */}
       <div className="absolute top-0 right-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
       </div>

      <div className="flex items-start gap-5 mb-10 relative z-10">
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center text-pink-400 flex-shrink-0 -mt-12 border-4 border-[#050505] shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md cursor-pointer"
        >
          <Sparkles size={32} strokeWidth={2.5} />
        </motion.div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-black text-white leading-tight">Daily Reflection</h3>
          <p className="text-gray-400 text-xs font-bold tracking-wide uppercase">AI Sentiment Analysis</p>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 font-medium relative z-10">
        How are you feeling? Positive reflections earn Bonus XP!
      </p>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Today I felt..."
        className="flex-1 w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 resize-none mb-4 transition-all placeholder-gray-600 relative z-10"
      />

      <div className="flex justify-between items-center relative z-10">
        <div className="flex-1 mr-4">
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-sm font-bold px-4 py-2 rounded-xl shadow-lg border border-white/5 ${
                  feedback.score > 0 ? 'bg-green-500/10 text-green-400' : 
                  feedback.score < 0 ? 'bg-blue-500/10 text-blue-400' : 
                  'bg-gray-700/50 text-gray-300'
                }`}
              >
                {feedback.feedback}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalyze}
          disabled={!entry.trim()}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-pink-500/20 font-bold"
        >
          <span>Analyze</span>
          <Send size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Journal;
