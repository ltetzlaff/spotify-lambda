import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import spotify from "../spotify/api"

const api: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  const token = event.headers.Token
  try {
    const info = await spotify.getUserTopTracks(token)

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "UserInfo",
        body: info
      })
    }

    cb(undefined, response)
  } catch (e) {
    return e.handle(cb)
  }
}

export default api
