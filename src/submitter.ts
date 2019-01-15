import * as dotenv from "dotenv";
import * as fetch from "node-fetch";
dotenv.config();

/** The form submission API is accessible at /form/:formId/submission.json
 * - The formId is extracted
 * - The HTTP call is created
 * - ... then sent, the response being post-processed to be API Gateway
 *   compliant
 */

/** Transform a response into valid API gateway format:
 * {
 *   "isBase64Encoded": Bool,
 *   "statusCode": String,
 *   "body": String
 * }
 */

const reqHeaders = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.OAUTH_TOKEN}`
  }
};

const getReqBody = data => {
  return {
    body: {
      field_61988637: "short 1",
      field_61988638: "longer better answer comes from the test lambda",
      field_61988639: "Option1\nOption2\nOption3\nOption4",
      field_61988640: "Option 1"
    }
  };
};

const getFormId = data => "/";

const getFullUrl = (formId: string) => {
  return `${process.env.FORMSTACK_URL}/${formId}submission.json`;
};

// 3. Send to Formstack
export const sendToFormstack = (data: object) => {
  const formId: string = getFormId(data);
  const formstackUrl: string = getFullUrl(formId);
  const reqBody: object = getReqBody(data);
  const request: object = { ...reqHeaders, ...reqBody };

  console.log("request is:", request);
  fetch(formstackUrl, request)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(`POST request to Formstack failed: ${err}`));
};
