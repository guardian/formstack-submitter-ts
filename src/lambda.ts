import { sendToFormstack } from "./submitter";

export const handler = async (event): Promise<void> => {
  console.log("Formstack Submitter ran");

  try {
    const result = await sendToFormstack(event);
    console.log("Response from Formstack:", result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
