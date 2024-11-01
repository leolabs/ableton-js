import { describe, it } from "vitest";
import { withAbleton } from "../util/tests";
import { GettableProperties } from "./mixer-device";


describe("Session", () => {
    it("should check the test function", async () => {
        await withAbleton(async (ab) => {
            const result = await ab.session.testFromTs(1);
        });
    });
});
