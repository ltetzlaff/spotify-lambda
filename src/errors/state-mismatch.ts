import CustomError from "./custom-error"
import { ErrorCodes } from "improved/dist/ajax"

export default class StateMismatchError extends CustomError {
  constructor() {
    super(
      ErrorCodes.Unauthorized,
      "StateMismatchError",
      "State Mismatch when obtaining auth token."
    )
  }
}
