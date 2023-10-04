import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return 'Hello trpc lambda';
  }),
  greet: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return `Hello ${input}`;
  }),
  context: publicProcedure.query(async ({ ctx }) => {
    return ctx;
  }),
});

interface CreateContextOptions {
  clientIp: string | null;
  token: string | null;
}

export const createInnerContext = (opts: CreateContextOptions) => {
  return {
    clientIp: opts.clientIp,
    token: opts.token,
  };
};

export type AppRouter = typeof appRouter;
