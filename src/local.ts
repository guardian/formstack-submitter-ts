// const myHandler = require('./lambda').handler;
import { handler } from "./lambda";

const fakeEvent = {
  data: {
    headers: "hello",
    body: {}
  }
};

const run = async () => await handler(fakeEvent);

run();
