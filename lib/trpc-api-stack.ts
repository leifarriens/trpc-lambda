import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway';
import {
  DomainNameOptions,
  LambdaIntegration,
  LambdaRestApi,
} from 'aws-cdk-lib/aws-apigateway';

export class TrpcApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaRole = new iam.Role(this, 'ApiLambdaROle', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    const apiFunction = new NodejsFunction(this, 'api', {
      role: lambdaRole,
      runtime: Runtime.NODEJS_18_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      entry: 'lambda/api.ts',
    });

    const api = new LambdaRestApi(this, id, {
      restApiName: 'trpc-api',
      handler: apiFunction,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: ['*'],
      },
    });

    const trpcResource = api.root.addResource('api');
    const trpcApiResource = trpcResource.addResource('trpc');
    trpcApiResource.addProxy({
      anyMethod: true,
      defaultIntegration: new LambdaIntegration(apiFunction),
    });
  }
}
