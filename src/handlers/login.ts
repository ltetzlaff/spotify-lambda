import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import { getRandomString } from "../utils/random"
import Scope from "../spotify/scope"
import { STATE_COOKIE_KEY } from "../utils/envs"
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
    redirect_uri:
      "https://xble8hqh93.execute-api.eu-west-1.amazonaws.com/dev/redirect"
  }

  const response = {
    statusCode: 302,
    headers: {
      Location: (await auth).getRequestAuthURL(state, query),
      "Set-Cookie": `${STATE_COOKIE_KEY}=${state};`
    }
  }

  cb(undefined, response)
}

export default login
