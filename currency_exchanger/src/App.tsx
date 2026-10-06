// import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyConverter } from './components/CurrencyConverter';
import { OfflineBanner } from './components/OfflineBanner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OfflineBanner />
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-10 px-4 font-sans selection:bg-emerald-500/30">
        <header className="w-full max-w-4xl mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Global FX Intelligence
            </h1>
            <p className="text-slate-400 mt-1">Real-time analytics & trend forecasting</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              Live Market Data
            </span>
          </div>
        </header>

        <main className="w-full max-w-4xl">
          <CurrencyConverter />
        </main>

        <footer className="mt-20 text-slate-600 text-sm">
          © 2026 Global FX Intelligence using ExchangeRate-API
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
