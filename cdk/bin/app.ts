#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StackVpc } from '../lib/stack-vpc';
import { SysConstant } from '../lib/sys-const';

const app = new cdk.App();

const systemId = app.node.tryGetContext("systemId");
const systemNumber = app.node.tryGetContext("systemNumber");

const sysConst = new SysConstant(systemId, systemNumber);
const { SYSTEM_ID: sysId, SYSTEM_NUMBER: sysNumber } = sysConst;

const stackName = `stack-vpc-${sysId}-${sysNumber}`;
new StackVpc(app, stackName, sysId, sysNumber, {
    description: stackName,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
