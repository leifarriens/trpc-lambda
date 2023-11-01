import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.API_BASE_URL}/api/trpc`,
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
