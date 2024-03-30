import * as crypto from 'crypto';
import { UUID } from '.';

const padStart = (str: string, targetLength: number, padString: string = '0') => {
  while (str.length < targetLength) {
    str = padString + str;
  }
  return str;
}

export const uuidV1 = (): UUID => {
  const timestamp = Date.now();
  const time_low = timestamp & 0xffffffff;
  const time_mid = (timestamp >> 32) & 0xffff;
  const time_hi_and_version = (timestamp >> 48) & 0x0fff;
  const clock_seq_hi_and_reserved = 0x80 | ((Math.random() * 0x10000) & 0x3f);
  const clock_seq_low = Math.random() * 256 | 0;
  const node = crypto.randomBytes(6);
  return [
    padStart(time_low.toString(16), 8),
    padStart(time_mid.toString(16), 4),
    padStart(time_hi_and_version.toString(16), 4),
    padStart(clock_seq_hi_and_reserved.toString(16), 2),
    padStart(clock_seq_low.toString(16), 2),
    node.toString('hex'),
  ].join('-') as UUID;
}
