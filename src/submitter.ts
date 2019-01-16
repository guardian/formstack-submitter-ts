import * as dotenv from "dotenv";
import * as fetch from "node-fetch";
dotenv.config();

/** The form submission API is accessible at /form/:formId/submission.json
 * - The formId is extracted
 * - The HTTP call is created
 * - ... then sent, the response being post-processed to be API Gateway
 *   compliant
 */

const reqHeaders = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.OAUTH_TOKEN}`
  }
};

const getDataBody = data => {
  try {
    return data.body;
  } catch (err) {
    console.error("Missing body property in request payload", err);
  }
};

const getFormId = (data): string => {
  const parsedData = JSON.parse(data.body);
  if (parsedData.formId) {
    return parsedData.formId;
  } else {
    console.error("Missing Form Id in request payload");
  }
};

const getFullUrl = (formId: string): string => {
  return `${process.env.FORMSTACK_URL}/${formId}/submission.json`;
};

export const sendToFormstack = async (data: object) => {
  const formId: string = getFormId(data);
  const formstackUrl: string = getFullUrl(formId);
  const reqBody: object = getDataBody(data);
  const request: object = { ...reqHeaders, body: reqBody };

  await fetch(formstackUrl, request)
    .then(res => {
      console.log("Request succeeded with status", res.status);
      console.log("Response", res);
      return res.json();
    })
    .then(json => console.log(json))
    .catch(err => console.error(`POST request to Formstack failed: ${err}`));
};
