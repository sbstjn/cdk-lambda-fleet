# AWS CDK: Lambda Fleet

[![MIT License](https://badgen.now.sh/badge/License/MIT/purple?1)](https://github.com/sbstjn/cdk-lambda-fleet/blob/master/LICENSE.md)
[![MIT License](https://badgen.net/npm/v/cdk-lambda-fleet?1)](https://www.npmjs.com/package/cdk-lambda-fleet)

> Deploy multiple AWS Lambda functions as container images to ECR with CDK.

## Intention

Have a CloudFormation stack with multiple AWS Lambda functions in different langauges.

## Usage

You can fork this repository and create a folder like `src/lambda-node-example` and store a `Dockerfile` there:

```Dockerfile
FROM amazon/aws-lambda-nodejs:12

ARG FUNCTION_DIR="/var/task"

RUN mkdir -p ${FUNCTION_DIR}

COPY package.json ${FUNCTION_DIR}

RUN npm install

COPY handler.js ${FUNCTION_DIR}

CMD [ "handler.run" ]
```

Using the **AWS CDK**, a docker image will be created and deployed to **Amazon ECR** for every folder in `src/`. After uploading the image, an **AWS Lambda** will be created or updated to use the latest image. Run `yarn deploy` to deploy all functions and output the function's arn.

## CDK Construct

When using the AWS CDK in TypeScript, you can use the published `LambdaFleet` construct:

```typescript
import * as path from "path";
import * as cdk from "@aws-cdk/core";

import { LambdaFleet } from "cdk-lambda-fleet";

export class FleetStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LambdaFleet(this, "Fleet", {
      path: path.resolve(__dirname, "../../src"),
    });
  }
}
```

## Examples

- [`src/lambda-node-example`](src/lambda-node-example)
- [`src/lambda-python-example`](src/lambda-python-example)
- [`src/lambda-typescript-example`](src/lambda-typescript-example)

## Deployment

```bash
# Deploy all functions

$ > yarn deploy
```

## Usage

```r
Fleet.FleetLambdaNodeExampleArnXYZ = "arn:aws:lambda:eu-central-1:123:function:Fleet-FleetLambdaNodeExampleXYZ-XYZ"
Fleet.FleetLambdaPythonExampleArnXYZ = "arn:aws:lambda:eu-central-1:123:function:Fleet-FleetLambdaPythonExampleXYZ-XYZ"
Fleet.FleetLambdaTypescriptExampleArnXYZ = "arn:aws:lambda:eu-central-1:123:function:Fleet-FleetLambdaTypescriptExampleXYZ-XYZ"
```
