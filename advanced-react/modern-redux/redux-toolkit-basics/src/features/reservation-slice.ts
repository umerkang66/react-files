import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReservationState {
  value: string[];
}

const initialState: ReservationState = { value: [] };

export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<string>) => {
      // name of reservation
      state.value.push(action.payload);
    },

    removeReservation: (state, action: PayloadAction<number>) => {
      // number of index to remove
      state.value.splice(action.payload, 1);
    },
  },
});

// actions
export const reservationActions = reservationSlice.actions;

// reducer
const { reducer } = reservationSlice;
export default reducer;
