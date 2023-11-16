import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/cars-slice';
import formReducer from './slices/form-slice';

const store = configureStore({
  reducer: {
    form: formReducer,
    cars: carsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/form-slice';
export * from './slices/cars-slice';

export default store;
