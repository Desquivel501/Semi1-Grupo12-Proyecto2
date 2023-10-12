import { AwsConfig } from "../customTypes/aws";

export const configS3: AwsConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_S3 as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_S3 as string,
  },
  region: process.env.AWS_REGION as string,
};

export const configRekognition: AwsConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_REKOGNITION as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_REKOGNITION as string,
  },
  region: process.env.AWS_REGION as string,
};

export const configTranslate: AwsConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_TRANSLATE as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_TRANSLATE as string,
  },
  region: process.env.AWS_REGION as string,
};
