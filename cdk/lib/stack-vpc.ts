#!/usr/bin/env node
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class StackVpc extends Stack {
  readonly vpc: ec2.Vpc;
  constructor(scope: Construct, id: string, systemId: string, systemNumber: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'private-subnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
      vpcName: `vpc-${systemId}-${systemNumber}`,
      gatewayEndpoints: {
        S3: {
          service: ec2.GatewayVpcEndpointAwsService.S3,
        },
      },
    });

    const endpointSecurityGroup = new ec2.SecurityGroup(this, 'EndpointSecurityGroup', { vpc });
    endpointSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), 'allow all trafix from own secutiry group');

    vpc.addInterfaceEndpoint('VpceCloudWatchLogs', {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
      securityGroups: [
        endpointSecurityGroup
      ],
      open: false
    });

    vpc.addInterfaceEndpoint('VpceSecretsManager', {
      service: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
      securityGroups: [
        endpointSecurityGroup
      ],
      open: false
    });

    vpc.addInterfaceEndpoint('VpceSts', {
      service: ec2.InterfaceVpcEndpointAwsService.STS,
      securityGroups: [
        endpointSecurityGroup
      ],
      open: false
    });

    vpc.addInterfaceEndpoint('VpceRedshift', {
      service: {
        name: `com.amazonaws.${Stack.of(this).region}.redshift`,
        port: 443,
      },
      securityGroups: [
        endpointSecurityGroup
      ],
      open: false
    });
  }
}
