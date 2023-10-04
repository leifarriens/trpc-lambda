import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter, createInnerContext } from './server';
import cors from 'cors';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers.authorization?.split(' ')[1];

  return createInnerContext({
    clientIp: req.socket.remoteAddress ?? null,
    token: token ?? null,
  });
};

const app = express();
app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Api dev server listening on http://localhost:${PORT}`);
});
