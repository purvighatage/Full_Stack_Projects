// import axios from 'axios';
import { format, subDays } from 'date-fns';

export interface ExchangeRateResponse {
    base: string;
    rates: Record<string, number>;
    date: string;
}

export interface HistoricalRate {
    date: string;
    rate: number;
}

// const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
// Using ExchangeRate-API (free tier supports standard base currency)
// Or Open Exchange Rates, or a free alternative. 
// For this demo, we'll use a public free API or fallback to mock.
// const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

// MOCK DATA for offline/demo mode
const MOCK_RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    JPY: 148.5,
    AUD: 1.52,
    CAD: 1.35,
    CHF: 0.88,
    CNY: 7.19,
    NZD: 1.63,
};

// Simulate historical volatility
const generateMockHistory = (base: string, target: string, days: number): HistoricalRate[] => {
    const history: HistoricalRate[] = [];
    let currentRate = (MOCK_RATES[target] || 1) / (MOCK_RATES[base] || 1);
    const volatility = 0.005; // 0.5% daily volatility

    for (let i = days; i >= 0; i--) {
        const date = subDays(new Date(), i);
        // Random walk
        const change = 1 + (Math.random() * volatility * 2 - volatility);
        currentRate *= change;
        history.push({
            date: format(date, 'yyyy-MM-dd'),
            rate: Number(currentRate.toFixed(4)),
        });
    }
    return history;
};

export const FXService = {
    getLatestRates: async (base: string = 'USD'): Promise<ExchangeRateResponse> => {
        try {
            // In a real app, strict error handling would switch to mock on any failure
            // For demo without key, we might fail fast if offline
            // const response = await axios.get(`${BASE_URL}/${base}`);
            // return response.data;

            // FALLBACK TO MOCK for reliability without API key in this demo
            console.log('Fetching rates (Simulated)...');
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate latency

            const rates = { ...MOCK_RATES };
            // Adjust standard mock rates relative to the requested base
            const baseRate = MOCK_RATES[base] || 1;
            const adjustedRates = Object.entries(rates).reduce((acc, [currency, rate]) => {
                acc[currency] = Number((rate / baseRate).toFixed(4));
                return acc;
            }, {} as Record<string, number>);

            return {
                base,
                rates: adjustedRates,
                date: format(new Date(), 'yyyy-MM-dd'),
            };
        } catch (error) {
            console.error("API Error, using fallback", error);
            throw error;
        }
    },

    getHistory: async (base: string, target: string, timeframe: '7D' | '30D' | '90D' = '30D'): Promise<HistoricalRate[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const days = timeframe === '7D' ? 7 : timeframe === '90D' ? 90 : 30;
        return generateMockHistory(base, target, days);
    },

    getAllCurrencies: () => Object.keys(MOCK_RATES),
};
