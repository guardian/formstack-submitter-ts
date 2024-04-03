# Formstack Submitter 

This lambda receives HTTP POST requests from Frontend and MAPI and sends them on to the Formstack database. 

The data comes from reader callout forms submitted on the user interface.

# To test locally

Run the local file: `npm run runlocal`
Ensure to put environment variables `formstack_url` and `oauth_token` on terminal before running above command.
Please refer stage CODE in content-api stack.


