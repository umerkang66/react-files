import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult } from '@testing-library/react';
import { PropsWithChildren, type ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { generateQueryClient } from '../react-query/queryClient';

const generateTestQueryClient = () => {
  const client = generateQueryClient();

  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };

  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  // create a query client, if it didn't get one
  const queryClient = client ?? generateTestQueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>,
  );
}

// create a unique queryClient for each test
export const createQueryClientWrapper = (): React.FC<PropsWithChildren> => {
  const queryClient = generateTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
