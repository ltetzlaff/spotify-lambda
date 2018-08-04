import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import Rooms from "../utils/rooms"
import oauth from "../spotify/auth"
import BadRequestError from "../errors/bad-request"
import { IStringIndexed } from "improved/dist/types"

const join: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  if (!(await oauth(event.headers.Token, cb))) return

  const { userID, hostID }: IStringIndexed = event.queryStringParameters || {}
  if (!userID || !hostID) {
    return new BadRequestError().handle(cb)
  }

  const roomInfo = await Rooms.join(hostID, userID)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Room joined successfully.",
      body: roomInfo
    })
  }

  cb(undefined, response)
}

export default join
