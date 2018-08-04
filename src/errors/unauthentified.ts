import CustomError from "./custom-error"
import { ErrorCodes } from "improved/dist/ajax"

export default class UnauthentifiedError extends CustomError {
  constructor() {
    super(
      ErrorCodes.Unauthorized,
      "UnauthentifiedError",
      "Spotify Auth Token could not be retrieved."
    )
  }
}
