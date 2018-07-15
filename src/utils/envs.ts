const {
  SPOTIFY_SECRET = "",
  SPOTIFY_CLIENT_ID = "",
  SPOTIFY_REDIRECT_URI = "",
  BUCKET_NAME = "",
  STATE_COOKIE_KEY = ""
} = process.env

if (
  [
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URI,
    SPOTIFY_SECRET,
    BUCKET_NAME,
    STATE_COOKIE_KEY
  ].some(a => a === "")
) {
  throw new Error(`Envs not set properly: ${JSON.stringify(process.env)}`)
}

export {
  SPOTIFY_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  BUCKET_NAME,
  STATE_COOKIE_KEY
}
