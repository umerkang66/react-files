import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';

const MockFollowersList = () => {
  return (
    <BrowserRouter>
      <FollowersList />
    </BrowserRouter>
  );
};

describe('Followers List', () => {
  afterEach(cleanup);

  it('should render follower item', async () => {
    render(<MockFollowersList />);
    const followerDivEl = await screen.findByTestId('follower-item-1');
    expect(followerDivEl).toBeInTheDocument();
  });

  it('should render multiple follower items', async () => {
    render(<MockFollowersList />);
    const followerDivEls = await screen.findAllByTestId(/follower-item/i);
    expect(followerDivEls.length).toBe(2);
  });
});
