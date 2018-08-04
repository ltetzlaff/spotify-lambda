import s3 from "./s3"

export interface IRoomInfo {
  hostID: string
  participants: string[]
}

export default class Rooms {
  public static s3Prefix = "rooms/"

  private static async writeRoomInfo(
    roomInfo: IRoomInfo
  ): Promise<IRoomInfo | undefined> {
    const success = await s3.write(
      Rooms.s3Prefix + roomInfo.hostID,
      JSON.stringify(roomInfo)
    )
    return success ? roomInfo : undefined
  }

  public static async getRoomInfo(
    hostID: string
  ): Promise<IRoomInfo | undefined> {
    const output = await s3.read(Rooms.s3Prefix + hostID)
    const request = await output.httpRequest
    try {
      const roomInfo = JSON.parse(request.body) as IRoomInfo
    } catch (e) {
      console.log(`Empty response from s3 on: ${Rooms.s3Prefix + hostID}`)
      return undefined
    }
  }

  public static async open(hostID: string): Promise<IRoomInfo | undefined> {
    const roomInfo: IRoomInfo = {
      hostID,
      participants: [hostID]
    }
    return Rooms.writeRoomInfo(roomInfo)
  }

  public static async join(
    hostID: string,
    userID: string
  ): Promise<IRoomInfo | undefined> {
    const roomInfo = await this.getRoomInfo(hostID)
    if (!roomInfo) return undefined

    roomInfo.participants.push(userID)
    return Rooms.writeRoomInfo(roomInfo)
  }
}
