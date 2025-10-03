import { configureStore } from '@reduxjs/toolkit';
import { exchangeApi } from '../api/exchangeApi';
import transactionsReducer from '../features/transactions/transactionsSlice';
import budgetReducer from '../features/budget/budgetSlice';
import settingsReducer from '../features/settings/settingsSlice';
import navigationReducer from '../features/navigation/navigationSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
    settings: settingsReducer,
    navigation: navigationReducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangeApi.middleware),
});