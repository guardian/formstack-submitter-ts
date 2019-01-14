// const myHandler = require('./lambda').handler;
import {handler} from "./lambda"

const run = async () => {
  let payload = { 
                  "question1": "my answer",
                  "question2": "my answer 2"
                 };

  await handler(
    payload
  )
};

run();
