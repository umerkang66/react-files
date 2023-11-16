import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const MockTodo = () => (
  <BrowserRouter>
    <Todo />
  </BrowserRouter>
);

const addTasks = tasks => {
  const inputEl = screen.getByPlaceholderText('Add a new task here...');
  const buttonEl = screen.getByRole('button', { name: 'Add' });

  tasks.forEach(task => {
    fireEvent.change(inputEl, { target: { value: task } });
    fireEvent.click(buttonEl);
  });
};

describe('Todo', () => {
  afterEach(() => cleanup());

  it('should render input and show component', () => {
    render(<MockTodo />);

    const testValue = 'test_value';
    addTasks([testValue]);

    const divElement = screen.getByText(testValue);
    expect(divElement).toBeInTheDocument();
  });

  it('should render multiple input values', () => {
    render(<MockTodo />);

    const testValues = ['test_value1', 'test_value2', 'test_value3'];

    addTasks(testValues);

    const divElements = screen.getAllByTestId('task-container');
    expect(divElements.length).toBe(3);

    divElements.forEach((el, i) => expect(el.textContent).toBe(testValues[i]));
  });

  it('task should not have completed class when initially rendered', () => {
    render(<MockTodo />);
    const testValue = ['test_value1'];
    addTasks(testValue);

    const divElement = screen.getByText(testValue);
    expect(divElement).not.toHaveClass('todo-item-active');
  });

  it('task should have completed class when it is clicked', () => {
    render(<MockTodo />);
    const testValue = ['test_value1'];
    addTasks(testValue);

    const divElement = screen.getByText(testValue);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass('todo-item-active');
  });
});
