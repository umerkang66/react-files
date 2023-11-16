import { render, screen } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { MemoryRouter } from 'react-router-dom';

import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

async function renderComponent() {
  // dumb the cache every time
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole('link');
}

// createServer() ---> GET '/api/user' ---> { user: null }
describe('User is not signed in', () => {
  createServer([{ path: '/api/user', res: () => ({ user: null }) }]);

  test('sign in and sign up are visible', async () => {
    await renderComponent();

    const signinButton = screen.getByRole('link', { name: /sign in/i });
    const signupButton = screen.getByRole('link', { name: /sign up/i });

    expect(signinButton).toBeInTheDocument();
    expect(signinButton).toHaveAttribute('href', '/signin');

    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveAttribute('href', '/signup');
  });

  test('sign out is not visible', async () => {
    await renderComponent();

    const signoutButton = screen.queryByRole('link', { name: /sign out/i });

    expect(signoutButton).not.toBeInTheDocument();
  });
});

// createServer() ---> GET '/api/user' ---> { user: { id: 3, email: 'test@test.com' } }
describe('User is signed in', () => {
  const userRes = { user: { id: 1, email: 'test@test.com' } };
  createServer([{ path: '/api/user', res: () => userRes }]);

  test('sign in and sign out are not visible', async () => {
    await renderComponent();

    const signinButton = screen.queryByRole('link', { name: /sign in/i });
    const signupButton = screen.queryByRole('link', { name: /sign up/i });

    expect(signinButton).not.toBeInTheDocument();
    expect(signupButton).not.toBeInTheDocument();
  });

  test('sign out is visible', async () => {
    await renderComponent();

    const signoutButton = screen.getByRole('link', { name: /sign out/i });

    expect(signoutButton).toBeInTheDocument();
    expect(signoutButton).toHaveAttribute('href', '/signout');
  });
});
