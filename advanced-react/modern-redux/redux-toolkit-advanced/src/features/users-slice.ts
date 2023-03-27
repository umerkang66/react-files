import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import data from '../api/data.json';

type UsersState = {
  data: User[];
};
const initialState: UsersState = {
  data: data.users,
};

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>;
const createUser = (draftUser: DraftUser): User => {
  // these tasks will include the id's of tasks
  return { id: nanoid(), tasks: [], ...draftUser };
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<DraftUser>) {
      const user = createUser(action.payload);
      state.data.unshift(user);
    },
    removeUser(state, action: PayloadAction<User['id']>) {
      const index = state.data.findIndex(user => user.id === action.payload);
      state.data.splice(index, 1);
    },
  },
});

const usersReducer = usersSlice.reducer;

export const { addUser, removeUser } = usersSlice.actions;
export { usersReducer };
