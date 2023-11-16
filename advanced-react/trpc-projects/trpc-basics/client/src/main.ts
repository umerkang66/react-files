import './style.css';
import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  wsLink,
  splitLink,
} from '@trpc/client';
import type { AppRouter } from '../../src';

const wsClient = createWSClient({ url: 'ws://localhost:3000/trpc' });

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      // when the condition will be evaluated to true, this will run
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({ url: '/trpc' }),
    }),
  ],
});

async function main() {
  const userId = new Date().toString();
  const result = await client.user.get.query({ userId });

  const { mutate } = client.user.update;
  const secretResult = await client.user.getAll.query();

  const connection = client.user.onUpdate.subscribe(undefined, {
    onData(value) {
      console.log(value);
    },
  });

  document.querySelector<HTMLDivElement>('#content')!.innerHTML = `
  <div>
  <pre>${JSON.stringify({ ...result, ...secretResult }, null, 2)}</pre>
  <button id="button">Update</button>
  </div>  
  `;

  document.getElementById('button')?.addEventListener('click', () => {
    mutate({ name: 'umer did this', userId });
  });
}

main();
