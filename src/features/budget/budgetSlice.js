import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goals: { 'Food': 500, 'Transport': 150, 'Shopping': 300, 'Entertainment': 200 },
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudgetGoal: (state, action) => {
      const { category, amount } = action.payload;
      state.goals[category] = amount;
    },
  },
});

export const { setBudgetGoal } = budgetSlice.actions;

export default budgetSlice.reducer;