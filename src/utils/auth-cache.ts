import ISpotifyToken from "../spotify/token"
import s3 from "./s3"

export default class AuthCache {
  public static async write(
    cacheFile: string,
    token: ISpotifyToken
  ): Promise<boolean> {
    return s3.write(cacheFile, JSON.stringify(token))
  }

  public static async read(
    cacheFile: string
  ): Promise<ISpotifyToken | undefined> {
    const output = await s3.read(cacheFile)
    const request = await output.httpRequest
    try {
      return JSON.parse(request.body)
    } catch (e) {
      console.log(`Empty response from s3 on: ${cacheFile}`)
      return undefined
    }
  }
}
