import { Callback } from "aws-lambda"
import CustomError from "./custom-error"

export default function errorHandler(cb: Callback, err: CustomError) {
  const response = {
    statusCode: err.code,
    body: JSON.stringify(err)
  }

  cb(undefined, response)
}
