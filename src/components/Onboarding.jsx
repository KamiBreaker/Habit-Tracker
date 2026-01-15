import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const { setUserName } = useGamification();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl shadow-2xl text-center"
      >
        <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="text-purple-400" size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, Hero.</h1>
        <p className="text-gray-400 mb-8">Every great journey begins with a name. What shall we call you?</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full bg-gray-900/50 border border-gray-700 text-white text-lg px-6 py-4 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-center placeholder-gray-600"
            autoFocus
          />
          <button 
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Begin Adventure</span>
            <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
