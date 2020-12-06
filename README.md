# AWS CDK: Lambda Fleet

[![MIT License](https://badgen.now.sh/badge/License/MIT/purple?3)](https://github.com/sbstjn/cdk-lambda-fleet/blob/master/LICENSE.md)
[![cdk-lambda-fleet on NPM](https://badgen.net/npm/v/cdk-lambda-fleet?3)](https://www.npmjs.com/package/cdk-lambda-fleet)

> Deploy multiple AWS Lambda functions as container images to Amazon ECR with CDK.

## Examples

- [`src/lambda-node-example`](src/lambda-node-example)
- [`src/lambda-python-example`](src/lambda-python-example)
- [`src/lambda-typescript-example`](src/lambda-typescript-example)

## CDK Construct

When using the AWS CDK in TypeScript, you can use the published `LambdaFleet` construct:

```bash
$ > yarn install cdk-lambda-fleet
```

```typescript
import * as path from "path";
import * as cdk from "@aws-cdk/core";

import { LambdaFleet } from "cdk-lambda-fleet";

export class FleetStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LambdaFleet(this, "Fleet", {
      path: path.resolve(__dirname, "../src"),
    });
  }
}
```

### Configuration

You can fork this repository and create a folder like `src/lambda-python-example` and store a `Dockerfile` there:

```Dockerfile
FROM amazon/aws-lambda-python:3.8

COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY handler.py ./

CMD [ "handler.run" ]
```

Using the **AWS CDK**, a docker image will be created and deployed to **Amazon ECR** for every folder in `src/`. After uploading the image, an **AWS Lambda** will be created or updated to use the latest image.

## Deployment

```bash
# Deploy all functions

$ > yarn deploy

[…]

Fleet.FleetLambdaNodeExampleArnXYZ = "arn:aws:lambda:eu-central-1:123:function:Fleet-FleetLambdaNodeExampleXYZ-XYZ"
Fleet.FleetLambdaPythonExampleArnXYZ = "arn:aws:lambda:eu-central-1:123:function:Fleet-FleetLambdaPythonExampleXYZ-XYZ"
Fleet.FleetLambdaTypescriptExampleArnXYZ = "arn:aws:lambda:eu-central-1:123:function:Fleet-FleetLambdaTypescriptExampleXYZ-XYZ"
```
