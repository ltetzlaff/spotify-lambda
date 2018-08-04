import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda"
import Rooms from "../utils/rooms"
import oauth from "../spotify/auth"
import BadRequestError from "../errors/bad-request"
import { IStringIndexed } from "improved/dist/types"

const room: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  if (!(await oauth(event.headers.Token, cb))) return

  const { userID }: IStringIndexed = event.queryStringParameters || {}
  if (!userID) {
    return new BadRequestError().handle(cb)
  }

  const roomInfo = await Rooms.open(userID)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Room created successfully.",
      body: roomInfo
    })
  }

  cb(undefined, response)
}

export default room
