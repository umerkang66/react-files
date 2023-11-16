import { render, screen, cleanup } from '@testing-library/react';
import Header from '../Header';

afterEach(() => {
  cleanup();
});

it('renders the heading, provided in props', () => {
  render(<Header title={'test_title'} />);

  const headingElement = screen.getByRole('heading', { name: 'test_title' });

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.innerHTML).toBe('test_title');
});

it('renders the heading, provided in props', () => {
  render(<Header title={'test_title'} />);

  const headingElement = screen.getByText('test_title');

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.innerHTML).toBe('test_title');
});

it('get the text by title', () => {
  render(<Header title={'test_title'} />);

  const secondaryHeading = screen.getByTitle('secondary_heading');
  expect(secondaryHeading).toBeInTheDocument();
  expect(secondaryHeading.innerHTML).toBe('Second Heading');
});

it('gets by the test id that provides in the component', () => {
  render(<Header title={'test_title'} />);

  const headingElement = screen.getByTestId('header_id');
  expect(headingElement).toBeInTheDocument();
  expect(headingElement.innerHTML).toBe('test_title');
});

// FIND BY
it('renders the heading, provided in props by find by', async () => {
  render(<Header title={'test_title'} />);

  const headingElement = await screen.findByText('test_title');

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.innerHTML).toBe('test_title');
});

// GET ALL
it('get all the headings by getAllBy', () => {
  render(<Header title={'test_title'} />);

  const headingElements = screen.getAllByRole('heading');
  expect(headingElements.length).toBe(2);
});
