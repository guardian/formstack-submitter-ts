import S3 = require("aws-sdk/clients/s3");
import * as moment from "moment";

const s3 = new S3({ region: "eu-west-1" });
export const upload = async (
  content: string,
  date: moment.Moment
): Promise<any> => {
  const Key = date.format("YYYY-MM-DD") + ".csv";
  const Bucket = "ophan-raw-affiliate-link";

  if (await exists({ Key, Bucket })) {
    console.log("File is already in S3");
    throw new Error("Output file already exists in S3");
  }
  console.log("Uploading to", Key, Bucket);

  await s3
    .putObject({
      Bucket,
      Key,
      Body: content,
      ACL: "bucket-owner-read"
    })
    .promise();
  console.log("Upload complete.");
};

const exists = async (params: {
  Key: string;
  Bucket: string;
}): Promise<boolean> => {
  try {
    const a = await s3.headObject(params).promise();
  } catch (e) {
    if ("code" in e && e.code === "NotFound") {
      return false;
    }
    console.log(
      "Something went wrong trying to check whether the file already exists.",
      e
    );
  }
  return true;
};
