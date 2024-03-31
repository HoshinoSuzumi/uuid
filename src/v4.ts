import { UUID } from "."
import { randomBytes } from "./polyfill"
import { unverifiedStringifyUUID } from "./utils"

const uuidv4 = (): UUID => {
  let rnds = randomBytes(16)
  rnds[6] = rnds[6] & 0x0f | 0x40
  rnds[8] = rnds[8] & 0x3f | 0x80
  return unverifiedStringifyUUID(rnds)
}

export { uuidv4 }