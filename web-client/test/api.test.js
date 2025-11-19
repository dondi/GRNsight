import { expect, test } from "vitest";
import { getDemoWorkbook, getDemoEndpoint, DEMO_TYPES } from "../src/services/api.js";

test("getDemoWorkbook returns workbook data", async () => {
  for (const demoType of Object.keys(DEMO_TYPES)) {
    const data = await getDemoWorkbook(demoType);
    expect(data).toBeDefined();
    expect(typeof data).toBe("object");
  }
});
