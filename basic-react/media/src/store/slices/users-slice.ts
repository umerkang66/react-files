import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchUsers, addUser, deleteUser } from '../thunks/users';
import { User } from '../types';

// QUICK NOTE! We are tracking isLoading, and error, just for demonstrating purposes, because we are handing that in component state

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    data: [] as User[],
    error: null as SerializedError | null,
  },
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.data.findIndex(user => user.id === action.payload);
      state.data.splice(index, 1);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

const usersReducer = usersSlice.reducer;

export { usersReducer };
