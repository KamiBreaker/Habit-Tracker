import React, { useState, useEffect } from 'react';
import { Check, Plus, Flame, Swords, Trash2, Pencil, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';

const PRAISE_MESSAGES = [
  "Fantastic work, {name}!",
  "You're crushing it, {name}!",
  "Leveling up in real life, {name}!",
  "Consistency is key, {name}. Great job!",
  "Nothing can stop you, {name}!",
  "Another victory for {name}!",
  "{name} is on fire today!",
  "Keep that streak alive, {name}!",
];

const ResetTimer = () => {
  const [timeLeft, setTimeLeft] = useState('--h --m');

  useEffect(() => {
    const calculateTime = () => {
      try {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setHours(24, 0, 0, 0);
        const diff = tomorrow - now;

        if (isNaN(diff) || diff < 0) {
           setTimeLeft('0h 0m');
           return;
        }

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        
        setTimeLeft(`${hours}h ${minutes}m`);
      } catch (e) {
        console.error("Timer error", e);
        setTimeLeft('--h --m');
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return <span className="text-xs font-mono font-bold ml-2">Next: {timeLeft}</span>;
};

const HabitList = () => {
  const { habits, addHabit, completeHabit, deleteHabit, editHabit, userName } = useGamification();
  const [newHabitName, setNewHabitName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [praise, setPraise] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName);
    setNewHabitName('');
  };

  const startEditing = (habit) => {
    setEditingId(habit.id);
    setEditName(habit.name);
  };

  const saveEdit = (id) => {
    if (editName.trim()) {
      editHabit(id, editName);
    }
    setEditingId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const triggerPraise = () => {
    const template = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
    const message = template.replace("{name}", userName);
    setPraise({ id: Date.now(), text: message });
    setTimeout(() => setPraise(null), 3000);
  };

  const handleComplete = (id) => {
    completeHabit(id);
    triggerPraise();
  };

  const isCompletedToday = (habit) => {
    const today = new Date().toISOString().split('T')[0];
    return (habit.completedDates || []).includes(today);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black/40 backdrop-blur-xl rounded-3xl pl-10 pr-8 py-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/5 h-full relative"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <AnimatePresence>
        {praise && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute -top-16 left-0 right-0 mx-auto w-max z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 border border-purple-400/30"
          >
            <span>🎉</span>
            {praise.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-5 mb-10 relative z-10">
        <motion.div 
          whileHover={{ scale: 1.15, rotate: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center text-purple-400 flex-shrink-0 -mt-12 border-4 border-[#050505] shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-md cursor-pointer"
        >
          <Swords size={32} strokeWidth={2.5} />
        </motion.div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-black text-white leading-tight">Your Quests</h3>
          <p className="text-gray-400 text-xs font-bold tracking-wide uppercase">Daily Challenges</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8 relative z-10">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="New Quest Name..."
          className="flex-1 bg-white/5 border border-white/5 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-600 font-medium"
        />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl transition-colors shadow-lg shadow-purple-500/20"
        >
          <Plus size={24} />
        </motion.button>
      </form>

      <div className="space-y-3 relative z-10">
        <AnimatePresence>
          {habits.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 text-center py-4"
            >
              No quests active. Add one above!
            </motion.p>
          )}
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="flex items-center justify-between bg-white/5 backdrop-blur-sm p-4 rounded-2xl group transition-all border border-transparent hover:border-white/5"
            >
              <div className="flex-1">
                {editingId === habit.id ? (
                  <div className="flex items-center gap-2 mr-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-gray-900 text-white px-3 py-2 rounded-xl border border-blue-500 outline-none w-full"
                      autoFocus
                    />
                    <button onClick={() => saveEdit(habit.id)} className="bg-green-500/20 text-green-400 p-2 rounded-lg hover:bg-green-500/30">
                      <Save size={18} />
                    </button>
                    <button onClick={cancelEditing} className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/30">
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold text-lg text-white/90 group-hover:text-white transition-colors">{habit.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-orange-400 font-bold text-xs bg-orange-500/10 px-2 py-0.5 rounded-full">
                        <Flame size={12} fill="currentColor" />
                        <span>{habit.streak} day streak</span>
                      </div>
                      
                      {/* Edit/Delete Actions - Visible on Hover */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEditing(habit)}
                          className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform"
                          title="Edit Quest"
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          onClick={() => deleteHabit(habit.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors hover:scale-110 transform"
                          title="Abandon Quest"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {!editingId && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleComplete(habit.id)}
                  disabled={isCompletedToday(habit)}
                  className={`transition-all duration-300 flex-shrink-0 ml-4 flex items-center justify-center ${
                    isCompletedToday(habit)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-default shadow-[0_0_15px_rgba(34,197,94,0.4)] rounded-xl px-4 py-2 font-bold'
                      : 'bg-gray-700/50 text-gray-400 hover:bg-green-500/20 hover:text-green-500 hover:border-green-500/50 border border-transparent p-3 rounded-xl'
                  }`}
                >
                  <Check size={20} strokeWidth={3} />
                  {isCompletedToday(habit) && <ResetTimer />}
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HabitList;
