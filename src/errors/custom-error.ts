import { Callback } from "aws-lambda"
import errorHandler from "./error-handler"

export default abstract class CustomError extends Error {
  constructor(public code: number, name: string, message?: string) {
    super(message)
    this.name = name
  }

  public handle(cb: Callback) {
    return errorHandler(cb, this)
  }
}
