import { config } from "dotenv"
config()

const {
  SPOTIFY_SECRET = "",
  SPOTIFY_CLIENT_ID = "",
  SPOTIFY_REDIRECT_URI = "",
  BUCKET_NAME = ""
} = process.env

if (
  [SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SECRET, BUCKET_NAME].some(
    a => a === ""
  )
) {
  throw new Error("Envs not set properly")
}

export { SPOTIFY_SECRET, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, BUCKET_NAME }
