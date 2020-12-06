#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { FleetStack } from './stack/fleet'

const app = new cdk.App()

new FleetStack(app, 'Fleet')
