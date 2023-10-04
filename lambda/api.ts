import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from '@trpc/server/adapters/aws-lambda';
import { appRouter, createInnerContext } from '../server';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
  return createInnerContext({
    clientIp: event.requestContext.http.sourceIp,
    token: event.headers.authorization?.split(' ')[1] ?? null,
  });
};

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
