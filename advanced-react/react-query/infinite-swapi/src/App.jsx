import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { InfinitePeople } from './people/InfinitePeople';
import { InfiniteSpecies } from './species/InfiniteSpecies';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  const [router, setRouter] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <button onClick={() => setRouter(0)}>Peoples</button>
        <button onClick={() => setRouter(1)}>Species</button>

        {router === 0 && <InfinitePeople />}
        {router === 1 && <InfiniteSpecies />}
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
