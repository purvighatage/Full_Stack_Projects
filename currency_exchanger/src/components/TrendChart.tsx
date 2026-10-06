import React, { useState } from 'react';
// TrendChart component for visualizing currency history
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useCurrencyHistory } from '../hooks/useRates';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TrendChartProps {
    base: string;
    target: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ base, target }) => {
    const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D'>('30D');
    const { data: history, isLoading } = useCurrencyHistory(base, target, timeframe);

    const calculateMinMax = () => {
        if (!history || history.length === 0) return [0, 0];
        const rates = history.map(h => h.rate);
        const min = Math.min(...rates);
        const max = Math.max(...rates);
        // Add 1% padding
        return [min * 0.99, max * 1.01];
    };

    const [minDomain, maxDomain] = calculateMinMax();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-xl w-full"
        >
            <div className="flex flex-row justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Market Trends</h3>
                    <p className="text-xs text-slate-400">
                        {base} vs {target} • {timeframe} Performance
                    </p>
                </div>
                <div className="flex bg-slate-800/50 rounded-lg p-1">
                    {(['7D', '30D', '90D'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`px-3 py-1 text-xs rounded-md transition-all ${timeframe === t
                                ? 'bg-emerald-500 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[250px] w-full">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 animate-pulse">
                        Loading Market Data...
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={history}>
                            <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: '#64748b', fontSize: 10 }}
                                tickFormatter={(str) => format(new Date(str), 'MMM d')}
                                minTickGap={30}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[minDomain, maxDomain]}
                                tick={{ fill: '#64748b', fontSize: 10 }}
                                tickFormatter={(val) => val.toFixed(3)}
                                axisLine={false}
                                tickLine={false}
                                width={40}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    borderColor: '#334155',
                                    color: '#f8fafc',
                                    fontSize: '12px'
                                }}
                                itemStyle={{ color: '#34d399' }}
                                labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
                                formatter={(value: any) => [value ? Number(value).toFixed(4) : '0', 'Rate']}
                            />
                            <Area
                                type="monotone"
                                dataKey="rate"
                                stroke="#10b981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorRate)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </motion.div>
    );
};
