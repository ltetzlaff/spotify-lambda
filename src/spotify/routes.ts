// tslint:disable-next-line:variable-name
const Routes = {
  token: "https://accounts.spotify.com/api/token",
  authorize: "https://accounts.spotify.com/authorize",
  currentUser: "https://api.spotify.com/v1/me",
  get topTracks() {
    return Routes.currentUser + "/top/tracks/"
  },
  get topArtists() {
    return Routes.currentUser + "/top/artists"
  }
}

export default Routes
