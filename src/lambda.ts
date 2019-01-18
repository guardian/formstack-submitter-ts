import { sendToFormstack } from "./submitter";

export const handler = async (event, context, callback): Promise<void> => {
  console.log(`Formstack Submitter ran`);

  try {
    const result = await sendToFormstack(event);
    console.log(result);
    callback(null, "my response from lambda");
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
