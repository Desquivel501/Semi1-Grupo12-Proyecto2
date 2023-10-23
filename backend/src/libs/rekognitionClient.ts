import {
  CompareFacesCommand,
  CompareFacesCommandInput,
  CompareFacesCommandOutput,
  DetectLabelsCommand,
  DetectLabelsCommandInput,
  DetectLabelsCommandOutput,
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

export async function detectLabels(source: string) {
  try {
    const Name = source.split(".com/")[1];
    if (!Name) {
      return [];
    }
    const params: DetectLabelsCommandInput = {
      Image: {
        S3Object: {
          Name,
          Bucket: AWS_BUCKET_NAME,
        },
      },
      MaxLabels:10
    };
    const command = new DetectLabelsCommand(params);
    const data: DetectLabelsCommandOutput = await rekognitionClient.send(
      command,
    );
    const labels = new Set() 
    data.Labels?.forEach((label)=>{
      labels.add(label.Name??"")
      // label.Parents?.forEach((parent)=>{
      //   labels.add(parent.Name??"")
      // })
    })
    return Array.from(labels) as string[]
  } catch (error) {
    // error handling.
    console.log({ error });
    return [];
  }
}
