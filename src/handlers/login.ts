import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import { getRandomString } from "../utils/random"
import Scope from "../spotify/scope"
import { STATE_COOKIE_KEY, SPOTIFY_REDIRECT_URI } from "../utils/envs"
import auth from "../spotify/auth"

const login: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  const state = getRandomString()

  const query = {
    scope: [
      Scope.UserReadPrivate,
      Scope.UserLibraryRead,
      Scope.UserTopRead,
      Scope.UserReadRecentlyPlayed
    ].join(" "),
    redirect_uri: SPOTIFY_REDIRECT_URI
  }

  const token = event.headers.Token
  const response = {
    statusCode: 302,
    headers: {
      Location: (await auth(token)).getRequestAuthURL(state, query),
      "Set-Cookie": `${STATE_COOKIE_KEY}=${state};`
    }
  }

  cb(undefined, response)
}

export default login
