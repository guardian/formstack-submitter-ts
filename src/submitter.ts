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

const getFormId = data => {
  try {
    const parsedData = JSON.parse(data.body);
    return parsedData.formId;
  } catch (err) {
    console.error("Missing Form Id in request payload", err);
  }
};

const getFullUrl = (formId: string): string => {
  return `${process.env.FORMSTACK_URL}/${formId}/submission.json`;
};

export const sendToFormstack = async (data: object) => {
  const formId: string = getFormId(data);
  console.log("FormID", formId);
  const formstackUrl: string = getFullUrl(formId);
  console.log("full url", formstackUrl);
  const reqBody: object = getDataBody(data);
  const request = { ...reqHeaders, body: reqBody };

  console.log("request is:", request);

  await fetch(formstackUrl, request)
    .then(res => {
      console.log("RESULT", res);
      return res.json();
    })
    .then(json => console.log("RESPONSE", json))
    .catch(err => console.error(`POST request to Formstack failed: ${err}`));
};
