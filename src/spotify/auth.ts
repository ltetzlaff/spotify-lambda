import Routes from "./routes"
import OAuth2 from "improved/dist/oauth2"
import authCache from "../utils/auth-cache"
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET,
  SPOTIFY_REDIRECT_URI
} from "../utils/envs"
import UnauthentifiedError from "../errors/unauthentified"
import { Callback } from "aws-lambda"

const config = {
  clientID: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_SECRET,
  redirectURI: SPOTIFY_REDIRECT_URI,
  tokenURL: Routes.token,
  authorizeURL: Routes.authorize
}

/**
 * @throws UnauthentifiedError
 */
async function getAuth(token: string) {
  const spotifyToken = await authCache.read(token)
  if (!spotifyToken) throw new UnauthentifiedError()
  return new OAuth2(config, spotifyToken)
}

async function oauth(
  token: string,
  cb?: Callback
): Promise<OAuth2 | undefined> {
  // Just let entitled users access rooms
  try {
    const auth = await getAuth(token)
    if (!auth) throw new UnauthentifiedError()
    return auth
  } catch (e) {
    if (cb) e.handle(cb)
    else throw e
  }
}

export default oauth
