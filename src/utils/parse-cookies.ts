import { IStringIndexed } from "improved/dist/types"

export default function parse(cookieString?: string): IStringIndexed {
  const parsed: IStringIndexed = {}
  if (!cookieString) return parsed

  const cookies = cookieString.split(";")
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=")
    parsed[key.trim()] = value.trim()
  }
  return parsed
}
