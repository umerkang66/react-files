import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

const onError = (err) => {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    err instanceof Error ? err.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
};

const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError,
      },
    },
  });
};

const queryClient = generateQueryClient();

export { generateQueryClient, queryClient };
