import React, { createContext, useContext, useState, useEffect } from 'react';
import Sentiment from 'sentiment';
import confetti from 'canvas-confetti';
import { loadState, saveState } from '../lib/storage';

const GamificationContext = createContext();

const sentiment = new Sentiment();

const INITIAL_STATE = {
  userName: null,
  xp: 0,
  level: 1,
  habits: [], // { id, name, streak, completedDates: [] }
  history: [], // { date, mood, note, xpGained }
};

export const GamificationProvider = ({ children }) => {
  const [state, setState] = useState(() => loadState() || INITIAL_STATE);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setUserName = (name) => {
    setState(prev => ({ ...prev, userName: name }));
  };

  const triggerLevelUpEffect = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn("Confetti failed", e);
    }
    // You could also add a toast notification here
  };

  // Level Up Logic
  useEffect(() => {
    const calculatedLevel = Math.floor(Math.sqrt(state.xp / 100)) + 1;
    if (calculatedLevel > state.level) {
      setState(prev => ({ ...prev, level: calculatedLevel }));
      triggerLevelUpEffect();
    }
  }, [state.xp, state.level]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      streak: 0,
      completedDates: []
    };
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));
  };

  const completeHabit = (id) => {
    const today = new Date().toISOString().split('T')[0];
    
    setState(prev => {
      const habitIndex = prev.habits.findIndex(h => h.id === id);
      if (habitIndex === -1) return prev;

      const habit = prev.habits[habitIndex];
      const completedDates = habit.completedDates || [];
      
      // Prevent double completion
      if (completedDates.includes(today)) return prev;

      const newHabit = {
        ...habit,
        completedDates: [...completedDates, today],
        streak: (habit.streak || 0) + 1
      };

      const newHabits = [...prev.habits];
      newHabits[habitIndex] = newHabit;

      return {
        ...prev,
        xp: prev.xp + 50, // Base XP for habit
        habits: newHabits
      };
    });
  };

  const deleteHabit = (id) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.filter(h => h.id !== id)
    }));
  };

  const editHabit = (id, newName) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.map(h => 
        h.id === id ? { ...h, name: newName } : h
      )
    }));
  };

  const analyzeJournal = (text) => {
    const result = sentiment.analyze(text);
    const score = result.score;
    
    let bonusXP = 0;
    let feedback = "Neutral reflection.";

    if (score > 0) {
      bonusXP = 20 * score; // Scale XP by positivity
      feedback = `Great positivity! +${bonusXP} Bonus XP!`;
    } else if (score < 0) {
      bonusXP = 5; // Small "consolation" XP for venting
      feedback = "Thanks for sharing. +5 XP for processing your thoughts.";
    }

    setState(prev => ({
      ...prev,
      xp: prev.xp + bonusXP,
      history: [...prev.history, {
        date: new Date().toISOString(),
        mood: score,
        note: text,
        xpGained: bonusXP
      }]
    }));

    return { score, bonusXP, feedback };
  };

  const resetData = () => {
    try {
      localStorage.removeItem('habit-quest-data');
      setState(INITIAL_STATE);
    } catch (e) {
      console.error("Failed to reset data", e);
    }
  };

  return (
    <GamificationContext.Provider value={{ 
      ...state, 
      setUserName,
      addHabit, 
      completeHabit,
      deleteHabit,
      editHabit, 
      analyzeJournal,
      resetData
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => useContext(GamificationContext);
