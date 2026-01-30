import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teamData: [],
  isLoading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setTeamData: (state, action) => {
      state.teamData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTeamData, setLoading, setError } = homeSlice.actions;
export default homeSlice.reducer;

// Selectors
export const selectTeamData = (state) => state.about.teamData;
export const selectIsLoading = (state) => state.about.isLoading;
export const selectError = (state) => state.about.error;