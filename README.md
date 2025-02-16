# aws-cdk-vpc

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
