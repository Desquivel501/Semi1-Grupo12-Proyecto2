import { S3Client } from "@aws-sdk/client-s3";
import { configS3 } from "../config/aws";
import multerS3 from "multer-s3";

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;

const s3Client = new S3Client(configS3);
const fieldnames = ["avatar","img","webcam","upload"]

export const s3Storage = multerS3({
  s3: s3Client,
  bucket: AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    try {
      // If there is not a file
      if (!file) {
        console.log("xd")
        cb(null, "f");
      }
      if (fieldnames.includes(file.fieldname)) {
        const fileName = file.fieldname + "/" + Date.now() + file.originalname;
        cb(null, fileName);
        return
      }
      cb(null, "f");
    } catch (error) {
      console.log({error});
      cb(null, "f");
    }
  },
});
