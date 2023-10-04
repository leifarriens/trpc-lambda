import { publicProcedure, router } from './trpc';
import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from '@trpc/server/adapters/aws-lambda';
import { z } from 'zod';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return 'Hello trpc lambda';
  }),
  greet: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return `Hello ${input}`;
  }),
});

export const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // no context

export type AppRouter = typeof appRouter;
