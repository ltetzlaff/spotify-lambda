import { S3 } from "aws-sdk"
import { BUCKET_NAME } from "./envs"

const s3 = new S3()

export default class {
  // tslint:disable-next-line:no-any
  public static async write(
    key: string,
    value: string | Buffer | Uint8Array | Blob | undefined
  ): Promise<boolean> {
    console.log(`Setting in S3: ${key}:${value ? value.toString() : ""}`)

    try {
      const put = s3.putObject({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: value
      })
      const request = await put.promise()
      const success = Boolean(request.$response.data)
      return success
    } catch (e) {
      return false
    }
  }

  public static async read(key: string) {
    return s3.getObject({ Bucket: BUCKET_NAME, Key: key })
  }
}
