import { ITokenAnswer } from "improved/dist/oauth2"

export default interface ISpotifyToken extends ITokenAnswer {
  token_type: "Bearer"
  expires_in: number
  scope: string
}
