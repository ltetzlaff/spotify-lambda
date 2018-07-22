import Routes from "./routes"
import OAuth2 from "improved/dist/oauth2"
import authCache from "../utils/auth-cache"
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET,
  SPOTIFY_REDIRECT_URI
} from "../utils/envs"

const config = {
  clientID: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_SECRET,
  redirectURI: SPOTIFY_REDIRECT_URI,
  tokenURL: Routes.token,
  authorizeURL: Routes.authorize
}

const oauth = async (token: string) =>
  new OAuth2(config, await authCache.read(token))

export default oauth
