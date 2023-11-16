import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { reset } from '../actions';

const songsSlice = createSlice({
  name: 'song',
  initialState: [] as string[],
  reducers: {
    addSong(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    removeSong(state, action: PayloadAction<string>) {
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

export const songsActions = songsSlice.actions;
const songsReducer = songsSlice.reducer;

export default songsReducer;
