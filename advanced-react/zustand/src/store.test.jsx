import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useStore } from './store';

vi.mock('zustand');

TestComponent.propTypes = {
  selector: PropTypes.func,
  effect: PropTypes.func,
};

function TestComponent({ selector, effect }) {
  const returnedFromSelector = useStore(selector);

  useEffect(() => effect(returnedFromSelector), [returnedFromSelector, effect]);

  return null;
}

it('should return default value at the start', () => {
  const selector = store => store.tasks;
  const effect = vi.fn();

  render(<TestComponent selector={selector} effect={effect} />);

  expect(effect).toHaveBeenCalledWith([]);
});

it('should add an item to the store and rerun the effect', () => {
  // argument is full 'store'
  const selector = ({ tasks, addTask }) => ({ tasks, addTask });

  const newTask = { title: 'a', state: 'PENDING' };

  // this function will be passed with 'store'
  const effect = vi.fn().mockImplementation(store => {
    !store.tasks.length && store.addTask(newTask.title, newTask.state);
  });

  render(<TestComponent selector={selector} effect={effect} />);

  // it has to be two because, first time with the default value (initialRender), and the second time when task is added.
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({ tasks: [newTask] })
  );
});

it('should add an item to the store and rerun the effect, and when delete that item, it should rerun effect', () => {
  // argument is full 'store'
  const selector = ({ tasks, addTask, deleteTask }) => ({
    tasks,
    addTask,
    deleteTask,
  });

  const newTask = { title: 'a', state: 'PENDING' };

  let isTaskCreated = false;
  let currentStore;

  // this function will be passed with 'store', from the TestComponent
  const effect = vi.fn().mockImplementation(store => {
    currentStore = store;
    if (!isTaskCreated) {
      store.addTask(newTask.title, newTask.state);
      isTaskCreated = true;
    } else if (store.tasks.length === 1) {
      // only do this, if there is only one task in the store.
      store.deleteTask(newTask.title);
    }
  });

  render(<TestComponent selector={selector} effect={effect} />);

  // it has to be two because, first time with the default value (initialRender), and the second time when task is added.
  expect(effect).toHaveBeenCalledTimes(3);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({ tasks: [newTask] })
  );
  // first task is created, then task is removed, thus storeTasks will be empty array.
  expect(currentStore.tasks).toEqual([]);
});
