import React, { useMemo } from 'react';
import { useCurrencyHistory } from '../hooks/useRates';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConfidenceMeterProps {
    base: string;
    target: string;
    currentRate: number;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ base, target, currentRate }) => {
    const { data: history, isLoading } = useCurrencyHistory(base, target, '30D');

    const status = useMemo(() => {
        if (!history || history.length === 0 || !currentRate) return 'loading';

        // Calculate 30-day average
        const sum = history.reduce((acc, curr) => acc + curr.rate, 0);
        const avg = sum / history.length;

        // Logic: If current rate is higher than average, it's a good time to buy (convert)
        const diffPercent = ((currentRate - avg) / avg) * 100;

        if (diffPercent > 0.5) return 'favorable';
        if (diffPercent < -0.5) return 'unfavorable';
        return 'neutral';
    }, [history, currentRate]);

    if (isLoading || status === 'loading') return null;

    const config = {
        favorable: {
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            width: 'w-full',
            icon: ThumbsUp,
            label: 'Favorable',
            desc: 'Rate is above 30-day average'
        },
        neutral: {
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            width: 'w-2/3',
            icon: Minus,
            label: 'Neutral',
            desc: 'Rate is stable'
        },
        unfavorable: {
            color: 'text-rose-400',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20',
            width: 'w-1/3',
            icon: ThumbsDown,
            label: 'Unfavorable',
            desc: 'Rate is below average'
        }
    };

    const activeConfig = config[status as keyof typeof config];
    const Icon = activeConfig.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl border ${activeConfig.border} ${activeConfig.bg} backdrop-blur-md`}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-200">Decision Confidence</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${activeConfig.border} ${activeConfig.color} bg-slate-900/50`}>
                    {activeConfig.label}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${activeConfig.bg} border ${activeConfig.border}`}>
                    <Icon className={`w-6 h-6 ${activeConfig.color}`} />
                </div>

                <div className="flex-1">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: status === 'favorable' ? '100%' : status === 'neutral' ? '50%' : '20%' }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full ${status === 'favorable' ? 'bg-emerald-500' : status === 'neutral' ? 'bg-amber-500' : 'bg-rose-500'}`}
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                        {activeConfig.desc}. <br />
                        Context: Your earning currency ({base}) is {status === 'favorable' ? 'strong' : status === 'unfavorable' ? 'weak' : 'steady'}.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
