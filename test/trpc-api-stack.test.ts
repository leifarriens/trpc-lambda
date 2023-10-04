import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as TrpcApi from '../lib/trpc-api-stack';

it('should create lambda function', () => {
  const app = new cdk.App();

  const stack = new TrpcApi.TrpcApiStack(app, 'TrpcApiStack');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'index.handler',
  });
});

it('should create api gateway', () => {
  const app = new cdk.App();

  const stack = new TrpcApi.TrpcApiStack(app, 'TrpcApiStack');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'trpc-api',
  });
});
