import React, { useState } from 'react';
// CurrencyConverter component with real-time conversion
import { useExchangeRates } from '../hooks/useRates';
import { formatCurrency } from '../utils/formatters';
import { ArrowRightLeft, TrendingUp, Info } from 'lucide-react';
import { TrendChart } from './TrendChart';
import { ConfidenceMeter } from './ConfidenceMeter';
import { motion } from 'framer-motion';

export const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [base, setBase] = useState('USD');
    const [target, setTarget] = useState('EUR');

    const { data, isLoading } = useExchangeRates(base);

    const rate = data?.rates[target] || 0;
    const convertedAmount = amount * rate;

    const handleSwap = () => {
        setBase(target);
        setTarget(base);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Converter Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
            >
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                    Convert
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">How much are you converting?</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <label className="block text-xs font-medium text-slate-400 mb-1">What's your earning currency?</label>
                            <select
                                value={base}
                                onChange={(e) => setBase(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            >
                                {data && Object.keys(data.rates).map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleSwap}
                            className="self-center p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition-colors border border-slate-700 my-1"
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                        </button>

                        <div className="relative">
                            <label className="block text-xs font-medium text-slate-400 mb-1">What's your home currency?</label>
                            <select
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            >
                                {data && Object.keys(data.rates).map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 mt-2 border-t border-slate-800">
                        <div className="text-sm text-slate-400 mb-1">Result</div>
                        <div className="text-3xl font-bold text-white tracking-tight break-all">
                            {isLoading ? '...' : formatCurrency(convertedAmount, target)}
                        </div>
                        <div className="text-xs text-slate-500 mt-2">
                            1 {base} = {rate.toFixed(4)} {target}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Analytics Panel */}
            <div className="md:col-span-2 space-y-6">
                <TrendChart base={base} target={target} />

                <ConfidenceMeter base={base} target={target} currentRate={rate} />

                {/* Insights Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-emerald-400">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-bold">Strong Buy Signal</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            {base} is currently strong against {target} relative to the 30-day average.
                            Consider converting now.
                        </p>
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-blue-400">
                            <Info className="w-4 h-4" />
                            <span className="text-sm font-bold">Volatility Alert</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            Market volatility is low (0.3%). Expect stable rates for the next 24 hours.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
