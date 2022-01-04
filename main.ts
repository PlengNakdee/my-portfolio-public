import { join, resolve } from 'path';
import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import {
  App,
  CfnOutput,
  Construct,
  RemovalPolicy,
  Stack,
  StackProps,
} from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import { Distribution } from "@aws-cdk/aws-cloudfront";
import { S3Origin } from "@aws-cdk/aws-cloudfront-origins";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import { AuthorizationType, GraphqlApi, MappingTemplate, PrimaryKey, Schema, Values } from '@aws-cdk/aws-appsync';

export class MyStack extends Stack {
  private readonly schemaDir = resolve(__dirname, 'schema');

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const siteBucket = new Bucket(this, "SiteBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "404.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const cloudDist = new Distribution(this, "myDist", {
      defaultBehavior: { origin: new S3Origin(siteBucket) },
    });

    new CfnOutput(this, "cloudFrontUrl", {
      value: cloudDist.distributionDomainName,
    });

    new BucketDeployment(this, "BucketDeployment", {
      sources: [Source.asset("./out")],
      destinationBucket: siteBucket,
    });

    const messagesTable = new Table(this, 'projects-table2', {
      tableName: 'projects-table2',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    const api = new GraphqlApi(this, 'TestApi1', {
      name: 'TestApi1',
      schema: Schema.fromAsset(join(this.schemaDir, 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
        },
      },
    });

    new CfnOutput(this, 'ApiUrl', {
      value: api.graphqlUrl,
    });

    const messagesTableDS = api.addDynamoDbDataSource('messagesDataSource', messagesTable);

    messagesTableDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'addMessage',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('id').auto(),
        Values.projecting('input'),
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });
  }
}

const devEnv = {
  account: "YOUR-ACCOUNT-NUMBER",
  region: "YOUR-REGION",
};

const app = new App();

new MyStack(app, "portfolio-dev", { env: devEnv });

app.synth();
