import S3 = require("aws-sdk/clients/s3");
import * as moment from "moment";

const s3 = new S3();
export const upload = async (
  content: string,
  date: moment.Moment
): Promise<any> => {
  const Key = date.format("YYYY-MM-DD");
  const Bucket = "some-s3-bucket";
  console.log("Uploading to", Key, Bucket);
  console.log(content);
  // const upload = await s3.putObject({
  //   Bucket: '?',
  //   Key: '?',
  //   Body: content
  // }).promise()
};
