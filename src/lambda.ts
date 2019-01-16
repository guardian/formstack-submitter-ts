import { sendToFormstack } from "./submitter";

export const handler = async (event): Promise<void> => {
  console.log(`Formstack Submitter ran`);
  sendToFormstack(event.data);
};
