import * as dotenv from "dotenv";
import * as fetch from "node-fetch";
dotenv.config();

// The request from dotcom/mapi is parsed and forwarded onto Formstack, the response is then sent back to Frontend

const reqHeaders = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.OAUTH_TOKEN}`
  }
};

const getDataBody = data => {
  if (data.body) {
    return data.body;
  } else {
    console.error("Missing body property in request payload");
  }
};

const getFormId = (data): string => {
  try {
    const parsedData = JSON.parse(data.body);
    if (parsedData.formId) {
      return parsedData.formId;
    } else {
      console.error("Missing form id in request payload");
    }
  } catch (e) {
    console.error(`Invalid JSON - failed to parse payload ${data.body}`, e);
  }
};

const getFullUrl = (formId: string): string => {
  return `${process.env.FORMSTACK_URL}/${formId}/submission.json`;
};

// API Gateway requires all responses returned from the lambda to be valid JSON in this format
const cleanResponse = (res): string => {
  const respObj = {
    isBase64Encoded: false,
    statusCode: res.status,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: "null"
  };
  return JSON.stringify(respObj);
};

export const sendToFormstack = async (data: object) => {
  const formId: string = getFormId(data);
  const formstackUrl: string = getFullUrl(formId);
  const reqBody: object = getDataBody(data);
  const request: object = { ...reqHeaders, body: reqBody };

  await fetch(formstackUrl, request)
    .then(res => {
      return cleanResponse(res);
    })
    .catch(err => console.error(`POST request to Formstack failed: ${err}`));
};
