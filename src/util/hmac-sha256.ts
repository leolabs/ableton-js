import { hmac } from "@noble/hashes/hmac.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";

export function hmacSha256Hex(password: string, salt: string) {
  return bytesToHex(hmac(sha256, utf8ToBytes(password), utf8ToBytes(salt)));
}
