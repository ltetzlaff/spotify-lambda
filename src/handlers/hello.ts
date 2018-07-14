import "./envs"

import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"

const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Everything alive!",
      input: event,
    })
  }

  cb(undefined, response)
}

export default hello
