import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Car } from '../../types';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    searchTerm: '',
    entities: [] as (Car & { id: string })[],
  },
  reducers: {
    changeSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    addCar(state, action: PayloadAction<Car>) {
      const { name, cost } = action.payload;
      state.entities.push({ name, cost, id: nanoid() });
    },
    removeCar(state, action: PayloadAction<string>) {
      const updated = state.entities.filter(car => car.id !== action.payload);
      state.entities = updated;
    },
  },
});

export const carsActions = carsSlice.actions;
const carsReducer = carsSlice.reducer;

export default carsReducer;
