import { sendToFormstack } from "./submitter";

export const handler = async (event): Promise<void> => {
  console.log(`Formstack Submitter ran`);
  const result = await sendToFormstack(event);
  return result;
};
