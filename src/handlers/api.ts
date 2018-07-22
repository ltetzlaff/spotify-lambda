import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import spotify from "../spotify/api"

const api: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  const token = event.headers.Token
  const info = await spotify.getUserInfo(token)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "UserInfo",
      body: info
    })
  }

  cb(undefined, response)
}

export default api
