import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getDemoWorkbook, getDemoEndpoint, getNetworkMode } from "../src/services/api.js";
import {
  NETWORK_GRN_MODE_FULL,
  NETWORK_PPI_MODE_FULL,
  NETWORK_GRN_MODE_SHORT,
  NETWORK_PPI_MODE_SHORT,
  DEMO_TYPES,
} from "../src/helpers/constants";

describe("api service", () => {
  const loadApiWithEnv = async (overrides, flavor) => {
    const originalEnv = {
      DEV: import.meta.env.DEV,
      VITE_HOST: import.meta.env.VITE_HOST,
      VITE_PORT: import.meta.env.VITE_PORT,
    };

    Object.assign(import.meta.env, overrides);
    vi.resetModules();
    const mod =
      flavor === "dev"
        ? await import("../src/services/api.js?dev")
        : await import("../src/services/api.js?prod");
    Object.assign(import.meta.env, originalEnv);
    return mod;
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("getDemoWorkbook returns parsed json for a successful response", async () => {
    const payload = { genes: [{ name: "A" }], links: [] };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(payload),
    });

    const result = await getDemoWorkbook("unweighted");

    expect(result).toEqual(payload);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.mock.calls[0][0]).toContain("/demo/unweighted");
  });

  it("getDemoWorkbook throws on non-ok response and logs the fetch error", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn(),
    });
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(getDemoWorkbook("weighted")).rejects.toThrow("Network response failed: 500");

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("getDemoWorkbook rethrows when fetch rejects", async () => {
    const err = new Error("network down");
    vi.spyOn(globalThis, "fetch").mockRejectedValue(err);
    vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(getDemoWorkbook("ppi")).rejects.toThrow("network down");
  });

  it("getDemoEndpoint returns Error for unknown demoValue", () => {
    const unknownDemoValue = { props: { children: "Unknown Demo" } };
    const result = getDemoEndpoint(unknownDemoValue);
    expect(result).toBeInstanceOf(Error);
  });

  it("getDemoEndpoint returns endpoint key for a known demo label (line 41 true branch)", () => {
    const [expectedEndpoint, demoLabel] = Object.entries(DEMO_TYPES)[0];
    const demoValue = { props: { children: demoLabel } };

    expect(getDemoEndpoint(demoValue)).toBe(expectedEndpoint);
    expect(getDemoEndpoint(demoLabel)).toBe(expectedEndpoint);
  });

  it("builds development API URL when import.meta.env.DEV is true (line 9 dev branch)", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ ok: true }),
    });

    const api = await loadApiWithEnv(
      {
        DEV: true,
        VITE_HOST: "dev.local",
        VITE_PORT: "1234",
      },
      "dev"
    );

    await api.getDemoWorkbook("unweighted");

    expect(fetchSpy.mock.calls[0][0]).toBe("http://dev.local:1234/demo/unweighted");
  });

  it("builds production API URL when import.meta.env.DEV is false (line 9 prod branch)", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ ok: true }),
    });

    const api = await loadApiWithEnv(
      {
        DEV: false,
        VITE_HOST: "prod.local",
        VITE_PORT: "9999",
      },
      "prod"
    );

    await api.getDemoWorkbook("weighted");

    expect(fetchSpy.mock.calls[0][0]).toBe("https://prod.local/demo/weighted");
  });

  it("getNetworkMode returns GRN and PPI full labels for valid workbook types", () => {
    expect(getNetworkMode(NETWORK_GRN_MODE_SHORT)).toBe(NETWORK_GRN_MODE_FULL);
    expect(getNetworkMode(NETWORK_PPI_MODE_SHORT)).toBe(NETWORK_PPI_MODE_FULL);
  });

  it("getNetworkMode throws for unknown workbook type", () => {
    expect(() => getNetworkMode("unknown-type")).toThrow("Unknown workbook type");
  });
});
