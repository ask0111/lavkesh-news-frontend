// utils/uploadToS3.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "your-region",
  credentials: {
    accessKeyId: "your-access-key",
    secretAccessKey: "your-secret-key",
  },
});

export async function uploadToS3(file: File): Promise<string> {
  const uploadParams = {
    Bucket: "your-bucket-name",
    Key: `uploads/${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://your-bucket-name.s3.your-region.amazonaws.com/uploads/${file.name}`;
}
