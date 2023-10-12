import { AwsConfig } from "../customTypes/aws";

export const configS3: AwsConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION as string,
};

export const configCognito = {
  UserPoolId: process.env.AWS_USER_POOL_ID as string,
  ClientId: process.env.AWS_CLIENT_ID as string,
}