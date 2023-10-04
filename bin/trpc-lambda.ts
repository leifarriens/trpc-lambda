#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TrpcApiStack } from '../lib/trpc-api-stack';

const app = new cdk.App();
new TrpcApiStack(app, 'TrpcApiStack', {
  env: {
    region: 'eu-north-1',
  },
});
