import React from 'react';
import StatsCard from '../components/StatsCard';
import HabitList from '../components/HabitList';
import Journal from '../components/Journal';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-transparent text-white font-sans flex justify-start md:justify-center py-10">
      <div className="w-full max-w-5xl px-6 md:pl-32 md:pr-12 space-y-8">
        <header className="text-left mb-12 md:pl-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 mb-3">
            HabitQuest
          </h1>
          <p className="text-gray-400 text-lg">Level up your life, one habit at a time.</p>
        </header>

        {/* Top Stats Section */}
        <section className="transform hover:scale-[1.01] transition-transform duration-300">
          <StatsCard />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Habits */}
          <section className="h-full transform hover:scale-[1.01] transition-transform duration-300">
            <HabitList />
          </section>

          {/* Right Column: Journal */}
          <section className="h-full transform hover:scale-[1.01] transition-transform duration-300">
            <Journal />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
