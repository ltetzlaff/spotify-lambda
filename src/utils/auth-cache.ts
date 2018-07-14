import { ITokenAnswer } from "improved/dist/oauth2"
import s3 from "./s3"

export default class AuthCache {
  private static cacheFile = "accessToken.json"

  public static async write(token: ITokenAnswer): Promise<boolean> {
    return s3.write(AuthCache.cacheFile, JSON.stringify(token))
  }

  public static async read(): Promise<ITokenAnswer | undefined> {
    const output = await s3.read(AuthCache.cacheFile)
    const request = await output.httpRequest
    try {
      return JSON.parse(request.body)
    } catch (e) {
      console.log(`Empty response from s3 on: ${AuthCache.cacheFile}`)
      return undefined
    }
  }
}
