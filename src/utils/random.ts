import { randomBytes } from "crypto"

export const getRandomString = (length: number = 16) => {
  return randomBytes(length << 1).toString("hex")
}
