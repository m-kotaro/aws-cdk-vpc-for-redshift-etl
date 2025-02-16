# aws-cdk-vpc

## 概要

本リポジトリの使い方とデプロイの仕方についてメモ

## CDK初期構築手順

### CloudShell

CloudShellを起動

![](./img/image.png)

### CDK確認

```bash
cdk --version
```

![](./img/image-1.png)

### CDK Bootstrap

```bash
cdk bootstrap
```

![](./img/image-2.png)

### CloudFormation

![](./img/image-3.png)

### CDKToolkit

CDKToolkitができていればOK

![](./img/image-4.png)

## npm install

```bash
cd aws-cdk-vpc-main/cdk/
npm install

```

## 構築用環境変数設定

```bash
export systemId= #
export systemNumber= #

```

## スタック作成

```bash
cdk synth -c systemId=$systemId -c systemNumber=$systemNumber
cdk deploy -c systemId=$systemId -c systemNumber=$systemNumber

```

## スタック削除

```bash
cdk destroy -c systemId=$systemId -c systemNumber=$systemNumber

```
