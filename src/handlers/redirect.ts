import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import { IStringIndexed } from "improved/dist/types"
import { STATE_COOKIE_KEY } from "../utils/envs"
import parseCookies from "../utils/parse-cookies"
import authCache from "../utils/auth-cache"
import ISpotifyToken from "../spotify/token"
import { getRandomString } from "../utils/random"
import oauth from "../spotify/auth"
import StateMismatchError from "../errors/state-mismatch"

const TOKEN_LENGTH = 16

const redirect: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  const { code, state }: IStringIndexed = event.queryStringParameters || {}

  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie)
  const stateCookie = cookies[STATE_COOKIE_KEY]

  if (!state || state !== stateCookie) {
    return new StateMismatchError().handle(cb)
  }

  // generate new token
  const token = getRandomString(TOKEN_LENGTH)
  const auth = await oauth(token, cb)
  if (!auth) return

  const spotifyToken = (await auth.requestToken(code)) as ISpotifyToken
  await authCache.write(token, spotifyToken)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Authenticated",
      token
    })
  }

  cb(undefined, response)
}

export default redirect
