import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { appRouter, createContext } from '../server';

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
