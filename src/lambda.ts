import { sendToFormstack } from "./submitter";

export const handler = async (event, context, callback): Promise<void> => {
  console.log(`Formstack Submitter ran`);

  try {
    const result = await sendToFormstack(event);
    console.log("ACTUAL RESULT", result);
    const resultTest: object = {
      isBase64Encoded: false,
      statusCode: 201,
      headers: { headerName: "headerValue" },
      body: "..."
    };
    callback(null, result);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
