import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import { getRandomString } from "../utils/random"
import Scope from "../spotify/scope"
import { STATE_COOKIE_KEY, SPOTIFY_REDIRECT_URI } from "../utils/envs"
import oauth from "../spotify/auth"

const login: Handler = async (
  event: APIGatewayEvent,
  _: Context,
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

  const auth = await oauth(token, cb)
  if (!auth) return

  const response = {
    statusCode: 302,
    headers: {
      Location: auth.getRequestAuthURL(state, query),
      "Set-Cookie": `${STATE_COOKIE_KEY}=${state};`
    }
  }
}

export default login
