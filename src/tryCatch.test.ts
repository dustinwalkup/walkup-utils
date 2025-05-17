import { describe, it, expect } from "vitest";
import { tryCatch, Result } from "../src/tryCatch";

describe("tryCatch()", () => {
  it("resolves to Success when the promise fulfills", async () => {
    const p = Promise.resolve(123);
    const result = await tryCatch(p);
    // exact match on shape
    expect(result).toEqual<Result<number>>({
      data: 123,
      error: null,
    });
  });

  it("resolves to Failure when the promise rejects", async () => {
    const error = new Error("oops");
    // force a rejected promise
    const p = Promise.reject<number>(error);
    const result = await tryCatch(p);
    // data should be null, error should be the same instance
    expect(result.data).toBeNull();
    expect(result.error).toBe(error);
  });
});
