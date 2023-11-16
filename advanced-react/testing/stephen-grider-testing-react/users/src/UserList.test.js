import { render, screen, within } from '@testing-library/react';

import UserList from './UserList';

function renderComponent() {
  const users = [
    { name: 'first', email: 'first@first.com' },
    { name: 'second', email: 'second@second.com' },
  ];

  const { container } = render(<UserList users={users} />);

  return {
    users,
    container,
  };
}

it('renders one row per user', () => {
  const { users } = renderComponent();

  // this 'users' testId is defined in hte usersList component
  // within these 'testid=users' div, find all the elements that have roles 'row'
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  // There are two users, so there should be two rows
  expect(rows).toHaveLength(users.length);
});

// SAME TEST WITH THE CONTAINER
it('renders one row per user 2', () => {
  const { users, container } = renderComponent();

  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr');

  expect(rows).toHaveLength(users.length);
});

it('renders the email and name of each user', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
