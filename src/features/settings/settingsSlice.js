import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayCurrency: 'USD',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDisplayCurrency: (state, action) => {
      state.displayCurrency = action.payload;
    },
  },
});

export const { setDisplayCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;