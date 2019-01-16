// const myHandler = require('./lambda').handler;
import { handler } from "./lambda";

const fakeEvent = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: {
    formId: "2994970",
    field_61988637: "abc adadf as",
    field_63859899: "",
    field_61988638: "adfasdf ",
    field_63496789: "",
    field_61988639: "\nOption1\nOption2\nOption3",
    field_61988640: "Option1"
  }
};

const run = async () => await handler(fakeEvent);

run();
