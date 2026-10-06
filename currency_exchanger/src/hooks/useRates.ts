import { useQuery } from '@tanstack/react-query';
import { FXService } from '../services/fx-service';

export const useExchangeRates = (baseCurrency: string) => {
    return useQuery({
        queryKey: ['rates', baseCurrency],
        queryFn: () => FXService.getLatestRates(baseCurrency),
        staleTime: 60 * 1000, // 1 minute
        refetchInterval: 60 * 1000, // Auto-refresh every minute
    });
};

export const useCurrencyHistory = (base: string, target: string, timeframe: '7D' | '30D' | '90D') => {
    return useQuery({
        queryKey: ['history', base, target, timeframe],
        queryFn: () => FXService.getHistory(base, target, timeframe),
        staleTime: 5 * 60 * 1000, // 5 minutes (history changes slowly)
    });
};
