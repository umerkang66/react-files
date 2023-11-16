import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepositoriesListItem from './RepositoriesListItem';

/*
  // FileIcon component is giving us trouble, so mock this component
  // by adding this, we cannot have to wait by findQuery

  jest.mock('../tree/FileIcon', () => {
    // This is the component
    return () => {
      return 'File Icon Component';
    };
  });
*/

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'javascript',
    description: 'A js library',
    owner: { login: 'facebook' },
    name: 'react',
    html_url: 'https://github.com/facebook/react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test('shows a link to the github homepage for this repository', async () => {
  const { repository } = renderComponent();

  // We have to do this, due to the act warnings,
  // i element (role=img) will appear asynchronously,
  // through the state change in useEffect,
  // so wait for that element to appear
  await screen.findByRole('img', { name: /javascript/i });

  const link = screen.getByRole('link', {
    name: /github repository/i,
  });

  expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a file icon with the appropriate icon', async () => {
  renderComponent();

  const icon = await screen.findByRole('img', { name: /javascript/i });

  expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent();

  // for the 'act' warning
  await screen.findByRole('img', { name: /javascript/i });

  const link = await screen.findByRole('link', {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});
