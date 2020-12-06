import * as cdk from '@aws-cdk/core'
import * as path from 'path'

import { LambdaFleet } from '../constructs/LambdaFleet'

export class FleetStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new LambdaFleet(this, 'Fleet', {
      path: path.resolve(__dirname, '../../src'),
    })
  }
}
