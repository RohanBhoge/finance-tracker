import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: 'Stats',
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = navigationSlice.actions;

export default navigationSlice.reducer;