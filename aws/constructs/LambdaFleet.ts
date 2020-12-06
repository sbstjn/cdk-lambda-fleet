import * as cdk from '@aws-cdk/core'
import * as Lambda from "@aws-cdk/aws-lambda"

import * as fs from 'fs'
import * as camelcase from 'camelcase'

export interface LambdaFleetProps {
  path: string
}

export class LambdaFleet extends cdk.Construct {
  public functionList: { [key: string]: Lambda.Function } = {}

  constructor(scope: cdk.Construct, id: string, props: LambdaFleetProps) {
    super(scope, id)

    this.addFunctions(props.path)
  }

  private addFunctions(path: string) {
    const nodes = fs.readdirSync(path)

    nodes.filter(
      node => fs.statSync(`${path}/${node}`).isDirectory()
    ).forEach(
      name => {
        const id = camelcase(name, { pascalCase: true })

        this.functionList[id] = new Lambda.DockerImageFunction(this, id, {
          code: Lambda.DockerImageCode.fromImageAsset(`${path}/${name}`),
        })

        new cdk.CfnOutput(this, `${id}Arn`, {
          value: this.functionList[id].functionArn
        })
      }
    )
  }
}