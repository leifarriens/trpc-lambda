import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://1i5w3n8l71.execute-api.eu-north-1.amazonaws.com/prod/api/trpc',
    }),
  ],
});

async function main() {
  const hello = await trpc.hello.query();
  console.log('hello', hello);

  const greet = await trpc.greet.mutate('Leif');
  console.log('greet', greet);
}

main();
