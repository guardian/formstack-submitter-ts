import * as dotenv from "dotenv";
import { sendToFormstack } from "./submitter";
dotenv.config();

export const handler = async (): Promise<void> => {
  console.log(`Formstack Submitter ran`);
  sendToFormstack(process.env.FORMSTACK_URL);
};
