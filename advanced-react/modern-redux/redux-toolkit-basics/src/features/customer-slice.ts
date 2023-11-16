import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
  id: string;
  name: string;
  food: string[];
}

interface CustomerState {
  value: Customer[];
}

const initialState: CustomerState = {
  value: [],
};

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
    addCustomerFood: (
      state,
      action: PayloadAction<{ customerId: string; foodName: string }>
    ) => {
      const foundCustomer = state.value.find(customer => {
        return customer.id === action.payload.customerId;
      });
      if (!foundCustomer) return;
      foundCustomer.food.push(action.payload.foodName);
    },
  },
});

export const customerActions = customerSlice.actions;

const { reducer } = customerSlice;
export default reducer;
