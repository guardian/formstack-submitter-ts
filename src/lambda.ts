import { dotenv } from "dotenv";
import { sendToFormstack } from "./submitter";

export const handler = async (payload): Promise<void> => {
  console.log(`Formstack Submitter ran`);
  console.log(`Payload was ${payload}`);
  sendToFormstack(testBody, "https://httpbin.org/post");
};

const requestForwarder = (data: string) => {
  console.log("request forwarder ran");
};
