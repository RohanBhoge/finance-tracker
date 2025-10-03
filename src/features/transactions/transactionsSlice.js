import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialTransactions = [
  { id: uuidv4(), type: 'income', category: 'Salary', amount: 3000, date: '2025-10-01', note: 'Monthly Paycheck', currency: 'USD' },
  { id: uuidv4(), type: 'expense', category: 'Food', amount: 75.50, date: '2025-10-01', note: 'Groceries', currency: 'USD' },
  { id: uuidv4(), type: 'expense', category: 'Transport', amount: 40, date: '2025-10-02', note: 'Gas', currency: 'USD' },
  { id: uuidv4(), type: 'expense', category: 'Entertainment', amount: 120, date: '2025-10-03', note: 'Concert Tickets', currency: 'EUR' },
];

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: initialTransactions,
  },
  reducers: {
    addTransaction: (state, action) => {
      state.items.unshift({ ...action.payload, id: uuidv4() });
    },
    updateTransaction: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
