import Routes from "./routes"
import oauth from "./auth"
import Oauth2 from "improved/dist/oauth2"

/**
 * @throws UnauthentifiedError
 */
async function get(token: string, url: string) {
  return ((await oauth(token)) as Oauth2).authenticatedGet(url)
}

async function getUserInfo(token: string) {
  return get(token, Routes.currentUser)
}

async function getUserTopArtists(token: string) {
  return get(token, Routes.topArtists)
}

async function getUserTopTracks(token: string) {
  return get(token, Routes.topTracks)
}

async function createPlaylist(token: string) {
  // #TODO
  //return get()
}

export default {
  getUserInfo,
  getUserTopArtists,
  getUserTopTracks
}
