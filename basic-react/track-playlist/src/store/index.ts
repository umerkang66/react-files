import { configureStore } from '@reduxjs/toolkit';

import moviesReducer, { moviesActions } from './slices/movies-slice';
import songsReducer, { songsActions } from './slices/songs-slice';

const store = configureStore({
  reducer: { songs: songsReducer, movies: moviesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { moviesActions, songsActions };
export { reset } from './actions';
export default store;
