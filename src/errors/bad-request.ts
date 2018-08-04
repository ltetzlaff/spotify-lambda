import CustomError from "./custom-error"

export default class BadRequestError extends CustomError {
  constructor() {
    super(
      // tslint:disable-next-line:no-magic-numbers
      400,
      "BadRequestError",
      "Required parts of query or body are missing."
    )
  }
}
