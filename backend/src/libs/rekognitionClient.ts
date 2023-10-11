import {
  CompareFacesCommand,
  CompareFacesCommandInput,
  CompareFacesCommandOutput,
  RekognitionClient,
} from "@aws-sdk/client-rekognition";
import { configRekognition } from "../config/aws";

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;
const rekognitionClient = new RekognitionClient(configRekognition);

export async function compareFaces(file: Express.Multer.File, source: string) {
  try {
    const Name = source.split(".com/")[1];
    if (!Name) {
      return;
    }
    const params: CompareFacesCommandInput = {
      SourceImage: {
        S3Object: {
          Name,
          Bucket: AWS_BUCKET_NAME,
        },
      },
      TargetImage: {
        Bytes: file.buffer,
      },
    };
    console.log(params)
    const command = new CompareFacesCommand(params);
    const data: CompareFacesCommandOutput = await rekognitionClient.send(
      command,
    );
    if (!data.FaceMatches) return false;
    if (data.FaceMatches.length == 0) return false;
    const match = data.FaceMatches[0].Similarity;
    return match ? match > 75 : false;
  } catch (error) {
    // error handling.
    console.log({ error });
    return false;
  }
}
