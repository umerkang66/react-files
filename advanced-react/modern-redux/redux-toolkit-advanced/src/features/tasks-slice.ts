import {
  createSlice,
  type PayloadAction,
  nanoid,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { removeUser } from './users-slice';

type TasksState = {
  data: Task[];
  isLoading: boolean;
};
const initialState: TasksState = {
  data: [],
  isLoading: false,
};

// everything is optional but title
type DraftTask = RequireOnly<Task, 'title'>;

export const createTask = (draftTask: DraftTask): Task => {
  return { id: nanoid(), ...draftTask };
};

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTask',
  async () => {
    const { tasks } = await fetch('/api/tasks').then(res => res.json());

    return tasks as Task[];
  }
);

const tasksSlice = createSlice({
  // prefix all the actions with
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<DraftTask>) {
      state.data.unshift(createTask(action.payload));
    },
    removeTask(state, action: PayloadAction<Task['id']>) {
      const index = state.data.findIndex(task => task.id === action.payload);
      state.data.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(removeUser, (state, action) => {
      // remove all the tasks related to user
      state.data = state.data.filter(task => task.user !== action.payload);
    });

    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
      state.data = [];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

const tasksReducer = tasksSlice.reducer;

export const { addTask, removeTask } = tasksSlice.actions;
export { tasksReducer };
