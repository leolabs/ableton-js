import { describe, expect, it } from "vitest";
import { hmacSha256Hex } from "./hmac-sha256";

describe("hmacSha256Hex", () => {
  it("matches Python hmac.sha256 for a short key", () => {
    expect(hmacSha256Hex("secret", "abc123")).toBe(
      "5ae5ac802a1a5c94fb683e1bfa121f9f700a26995213ff2fc1c503eb43ec71c6",
    );
  });

  it("hashes keys longer than one SHA-256 block", () => {
    expect(hmacSha256Hex("x".repeat(80), "msg")).toBe(
      "a4c011685c0698d5626fd453a2073673550d6b4f9e01b8693a4ace5f6920d651",
    );
  });
});
