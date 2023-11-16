import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

it('can receive a new user and show it on a list', () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  userEvent.click(nameInput);
  userEvent.keyboard('test');

  userEvent.click(emailInput);
  userEvent.keyboard('test@test.com');

  userEvent.click(button);

  const name = screen.getByRole('cell', { name: 'test' });
  const email = screen.getByRole('cell', { name: 'test@test.com' });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
