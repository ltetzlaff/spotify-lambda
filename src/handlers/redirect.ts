import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import { IStringIndexed } from "improved/dist/types"
import { ErrorCodes } from "improved/dist/ajax"
import { STATE_COOKIE_KEY } from "../utils/envs"
import parseCookies from "../utils/parse-cookies"
import auth from "../spotify/auth"
import authCache from "../utils/auth-cache"
import ISpotifyToken from "../spotify/token"
import { getRandomString } from "../utils/random"

const TOKEN_LENGTH = 16

const stateMisMatchReponse = {
  statusCode: ErrorCodes.Unauthorized,
  body: JSON.stringify({
    message: "State Mismatch"
  })
}

const redirect: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  const { code, state }: IStringIndexed = event.queryStringParameters || {}

  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie)
  const stateCookie = cookies[STATE_COOKIE_KEY]

  if (!state || state !== stateCookie) {
    cb(new Error("State Mismatch"), stateMisMatchReponse)
    return
  }

  // generate new token
  const token = getRandomString(TOKEN_LENGTH)

  const spotifyToken = (await (await auth(token)).requestToken(
    code
  )) as ISpotifyToken
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
