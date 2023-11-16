import { addTask, createTask, removeTask, tasksReducer } from './tasks-slice';

describe('Tasks Slice', () => {
  const initialState = {
    data: [
      createTask({ title: 'write test' }),
      createTask({ title: 'make them pass' }),
    ],
    isLoading: false,
  };

  it(`should add a task when the ${addTask}`, () => {
    const task = createTask({ title: 'Profit' });
    const action = addTask(task);
    const newState = tasksReducer(initialState, action);

    expect(newState.data).toEqual([task, ...initialState.data]);
  });

  it(`should remove a task when the ${removeTask}`, () => {
    const action = removeTask(initialState.data[1].id);
    const newState = tasksReducer(initialState, action);

    expect(newState.data).toEqual([initialState.data[0]]);
  });
});
