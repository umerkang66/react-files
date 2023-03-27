import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../../types';
import { carsActions } from './cars-slice';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    cost: 0,
  } as Car,
  reducers: {
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    changeCost(state, action: PayloadAction<number>) {
      state.cost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(carsActions.addCar, state => {
      state.name = '';
      state.cost = 0;
    });
  },
});

export const formActions = formSlice.actions;
const formReducer = formSlice.reducer;

export default formReducer;
