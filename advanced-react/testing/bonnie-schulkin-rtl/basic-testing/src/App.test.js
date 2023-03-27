import { render, screen } from '@testing-library/react';
import App from './App';

it('button has correct initial color', () => {
  render(<App />);
  // "name" is text inside button
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

it('button has correct initial text', () => {});

it('button turns blue when clicked', () => {});
