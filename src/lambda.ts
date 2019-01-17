import { sendToFormstack } from "./submitter";

export const handler = async (event, context, callback): Promise<void> => {
  console.log(`Formstack Submitter ran`);
  const result = await sendToFormstack(event);
  callback(null, result);
};
