import React from 'react';
import { GamificationProvider, useGamification } from './context/GamificationContext';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent = () => {
  const { userName } = useGamification();
  return userName ? <Dashboard /> : <Onboarding />;
};

function App() {
  return (
    <ErrorBoundary>
      <GamificationProvider>
        <AppContent />
      </GamificationProvider>
    </ErrorBoundary>
  );
}

export default App;