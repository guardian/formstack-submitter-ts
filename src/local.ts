import AWS = require("aws-sdk");
import { handler } from "./lambda";

const credentials = new AWS.SharedIniFileCredentials({ profile: "frontend" });
AWS.config.credentials = credentials;

const run = async () => {
  await handler({});
};

run();
