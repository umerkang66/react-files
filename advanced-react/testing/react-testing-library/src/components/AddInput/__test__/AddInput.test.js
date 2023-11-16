import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import AddInput from '../AddInput';

const mockSetTodos = jest.fn();

describe('Add Input', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render input element', () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);
    const inputEl = screen.getByPlaceholderText('Add a new task here...');

    expect(inputEl).toBeInTheDocument();
  });

  it('should able to type into input', () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);
    const inputEl = screen.getByPlaceholderText('Add a new task here...');

    const todo = 'go grocery shopping';
    fireEvent.change(inputEl, { target: { value: todo } });

    expect(inputEl.value).toBe(todo);
  });

  it('value should be empty string after clicking', () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);
    const inputEl = screen.getByPlaceholderText('Add a new task here...');

    // set the input value
    const todo = 'go grocery shopping';
    fireEvent.change(inputEl, { target: { value: todo } });
    expect(inputEl.value).toBe(todo);

    // simulate the click event on button
    const buttonEl = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(buttonEl);

    expect(inputEl.value).toBe('');
  });
});
