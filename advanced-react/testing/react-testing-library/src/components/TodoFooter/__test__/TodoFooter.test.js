import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TodoFooter from '../TodoFooter';

afterEach(() => {
  cleanup();
});

describe('Testing Functionality of TodoFooter', () => {
  it('should renders the number of tasks as provided in props', async () => {
    render(
      <BrowserRouter>
        <TodoFooter numberOfIncompleteTasks={8} />
      </BrowserRouter>
    );

    const todoParagraphElement = screen.getByText('8 tasks left');

    expect(todoParagraphElement).toBeInTheDocument();
  });

  it('should render task singular, if task is 1', () => {
    render(
      <BrowserRouter>
        <TodoFooter numberOfIncompleteTasks={1} />
      </BrowserRouter>
    );

    const todoParagraphElement = screen.getByText('1 task left');

    expect(todoParagraphElement).toBeInTheDocument();
    expect(todoParagraphElement).toContainHTML('p');
  });
});

describe('Testing if components appeared on screen', () => {
  it('should have text content', () => {
    render(
      <BrowserRouter>
        <TodoFooter numberOfIncompleteTasks={1} />
      </BrowserRouter>
    );

    const todoParagraphElement = screen.getByText('1 task left');
    expect(todoParagraphElement).toBeInTheDocument();
    expect(todoParagraphElement.textContent).toBe('1 task left');
  });
});
