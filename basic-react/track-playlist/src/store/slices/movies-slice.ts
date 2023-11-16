import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { reset } from '../actions';

const moviesSlice = createSlice({
  name: 'movie',
  initialState: [] as string[],
  reducers: {
    addMovie(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    removeMovie(state, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
  extraReducers(builder) {
    // when combined reducer is created, this will also be added in total combined Reducer
    // this is a common action
    builder.addCase(reset, (state, action) => {
      return [];
    });
  },
});

export const moviesActions = moviesSlice.actions;
const moviesReducer = moviesSlice.reducer;

export default moviesReducer;
