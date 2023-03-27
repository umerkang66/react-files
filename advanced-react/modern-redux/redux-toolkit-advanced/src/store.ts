import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './features/tasks-slice';
import { usersReducer } from './features/users-slice';

const store = configureStore({
  reducer: { tasks: tasksReducer, users: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
