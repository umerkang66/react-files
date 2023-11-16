import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from './UserForm';

it('shows two two inputs and a button', () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

it('calls on user add when the form is submitted', () => {
  const { name, email, nameInput, emailInput, mockFn } = renderAndGetInputs();

  // Simulating typing in name
  userEvent.click(nameInput);
  userEvent.keyboard(name);

  // Simulating typing in email
  userEvent.click(emailInput);
  userEvent.keyboard(email);

  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(mockFn).toHaveBeenCalledWith({ name, email });
});

it('clears the inputs after submitting', () => {
  const { name, email, nameInput, emailInput } = renderAndGetInputs();

  // Simulating typing in name
  userEvent.click(nameInput);
  userEvent.keyboard(name);

  // Simulating typing in email
  userEvent.click(emailInput);
  userEvent.keyboard(email);

  const button = screen.getByRole('button');
  userEvent.click(button);

  // Check if inputs are cleared
  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});

function renderAndGetInputs() {
  const mockFn = jest.fn();

  render(<UserForm onUserAdd={mockFn} />);
  const name = 'first';
  const email = 'first@first.com';

  // Click on the labels will focus on the inputs
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  return {
    name,
    email,
    nameInput,
    emailInput,
    mockFn,
  };
}
