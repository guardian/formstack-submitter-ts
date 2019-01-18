import { sendToFormstack } from "./submitter";

export const handler = async (event, context, callback): Promise<void> => {
  console.log(`Formstack Submitter ran`);

  try {
    const result = await sendToFormstack(event);
    console.log("ACTUAL RESULT", result);
    const resultTest: string = `{
      "isBase64Encoded": false,
      "statusCode": 201,
      "headers": { "headerName": "headerValue"},
      "multiValueHeaders": { "headerName": ["headerValue", "headerValue2"]},
      "body": "..."
     }`;
    callback(null, resultTest);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
