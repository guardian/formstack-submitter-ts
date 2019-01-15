// const myHandler = require('./lambda').handler;
import { handler } from "./lambda";

const run = async () => {
  await handler();
};

run();
