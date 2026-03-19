import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { getDemoWorkbook, getDemoEndpoint, DEMO_TYPES } from "../src/services/api.js";

test("getDemoEndpoint maps demoValue to correct endpoint", () => {
  for (const [endpoint, demoName] of Object.entries(DEMO_TYPES)) {
    const demoValue = { props: { children: demoName } };
    const result = getDemoEndpoint(demoValue);
    expect(result).toBe(endpoint);
  }
});

test("getDemoEndpoint returns Error for unknown demoValue", () => {
  const unknownDemoValue = { props: { children: "Unknown Demo" } };
  const result = getDemoEndpoint(unknownDemoValue);
  expect(result).toBeInstanceOf(Error);
});
