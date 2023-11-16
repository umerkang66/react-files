import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('displays the information of the repository', () => {
  const repository = {
    stargazers_count: 10,
    open_issues: 5,
    forks: 20,
    language: 'Javascript',
  };

  render(<RepositoriesSummary repository={repository} />);

  for (const key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});
