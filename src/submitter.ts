import * as fetch from "node-fetch";

/** The form submission API is accessible at /form/:formId/submission.json
 * - The formId is extracted
 * - The HTTP call is created
 * - ... then sent, the response being post-processed to be API Gateway
 *   compliant
 */

// 1. Receive Post request

const testHeaders = {};

// 2. Format request.

/** Transform a response into valid API gateway format:
 * {
 *   "isBase64Encoded": Bool,
 *   "statusCode": String,
 *   "body": String
 * }
 */

const headers = {
  method: "post",
  headers: { "Content-Type": "application/json" },
  isBase64Encoded: false,
  statusCode: "200"
};

const body = {
  field_61988637: "short 1",
  field_61988638: "longer better answer",
  field_61988639: "Option1\nOption2\nOption3\nOption4",
  field_61988640: "Option 1"
};

// 3. Send to Formstack
export const sendToFormstack = (formstackUrl: string) => {
  const request: object = { ...headers, ...body };
  fetch(formstackUrl, request)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(`POST request failed: ${err}`));
};
