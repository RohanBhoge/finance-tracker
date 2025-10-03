import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetLatestRatesQuery } from '../api/exchangeApi';

export const useCurrency = () => {
  const displayCurrency = useSelector((state) => state.settings.displayCurrency);

  const { data: rates, isLoading, error } = useGetLatestRatesQuery('USD');

  const convertAmount = useCallback((amount, fromCurrency) => {
    if (!rates || fromCurrency === displayCurrency) {
      return amount;
    }
    const rateFrom = rates.conversion_rates[fromCurrency];
    const rateTo = rates.conversion_rates[displayCurrency];

    if (!rateFrom || !rateTo) return amount;
    
    const amountInUSD = amount / rateFrom;
    return amountInUSD * rateTo;
  }, [rates, displayCurrency]);
  
  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: displayCurrency,
      minimumFractionDigits: 2,
    }).format(amount);
  }, [displayCurrency]);

  return { convertAmount, formatCurrency, displayCurrency, rates, isLoading, error };
};