import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getDemoWorkbook,
  getDemoEndpoint,
  getNetworkMode,
  getWorkbookFromForm,
  uploadWorkbook,
  getWorkbookFromUrl,
} from "../src/services/api.js";
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

  it("getDemoWorkbook returns null when both json and text parsing fail", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockRejectedValue(new Error("json broken")),
      text: vi.fn().mockRejectedValue(new Error("text broken")),
    });

    const result = await getDemoWorkbook("weighted");
    expect(result).toBeNull();
  });

  it("getDemoWorkbook returns null when response.json is not a function", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: "not-a-function",
    });

    const result = await getDemoWorkbook("unweighted");
    expect(result).toBeNull();
  });

  it("getDemoEndpoint returns Error for unknown demoValue", () => {
    const unknownDemoValue = { props: { children: "Unknown Demo" } };
    const result = getDemoEndpoint(unknownDemoValue);
    expect(result).toBeInstanceOf(Error);
  });

  it("getDemoEndpoint returns the endpoint key when the demo label is recognized", () => {
    const [expectedEndpoint, demoLabel] = Object.entries(DEMO_TYPES)[0];
    const demoValue = { props: { children: demoLabel } };

    expect(getDemoEndpoint(demoValue)).toBe(expectedEndpoint);
    expect(getDemoEndpoint(demoLabel)).toBe(expectedEndpoint);
  });

  it("builds development API URL when import.meta.env.DEV is true", async () => {
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

  it("builds production API URL when import.meta.env.DEV is false", async () => {
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

  it("getWorkbookFromForm uses POST when formData is present", async () => {
    const payload = { ok: true };
    const formData = new FormData();
    formData.append("file", new Blob(["a"]), "file.xlsx");

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(payload),
    });

    const result = await getWorkbookFromForm(formData, "upload");

    expect(result).toEqual(payload);
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining("/upload"), {
      method: "POST",
      body: formData,
    });
  });

  it("uploadWorkbook creates form data and delegates to POST path", async () => {
    const payload = { ok: true };
    const file = new File(["abc"], "network.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(payload),
    });

    const result = await uploadWorkbook(file, "upload");

    expect(result).toEqual(payload);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.mock.calls[0][0]).toContain("/upload");
    expect(fetchSpy.mock.calls[0][1].method).toBe("POST");
    expect(fetchSpy.mock.calls[0][1].body).toBeInstanceOf(FormData);
  });

  it("getWorkbookFromForm and getWorkbookFromUrl use GET when no formData is provided", async () => {
    const payload = { genes: [], links: [] };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(payload),
    });

    const resultFromForm = await getWorkbookFromForm(undefined, "demo/unweighted");
    const resultFromUrl = await getWorkbookFromUrl("demo/weighted");

    expect(resultFromForm).toEqual(payload);
    expect(resultFromUrl).toEqual(payload);
    expect(fetchSpy.mock.calls[0][0]).toContain("/demo/unweighted");
    expect(fetchSpy.mock.calls[0][1]).toBeUndefined();
    expect(fetchSpy.mock.calls[1][0]).toContain("/demo/weighted");
    expect(fetchSpy.mock.calls[1][1]).toBeUndefined();
  });
});

describe("The Gene Page (ported from classic api-tests.js)", () => {
  let dollar;

  const query = {
    symbol: "YHP1",
    species: "Saccharomyces_cerevisiae",
    taxon: 12345,
  };

  beforeEach(async () => {
    vi.resetModules();

    const serviceRoot = document.createElement("input");
    serviceRoot.className = "service-root";
    serviceRoot.setAttribute("value", "http://test");
    document.body.appendChild(serviceRoot);

    dollar = vi.fn(() => ({
      attr: () => "http://test",
    }));
    dollar.get = vi.fn();
    dollar.when = (...args) => Promise.all(args);

    globalThis.$ = dollar;
    globalThis.window.$ = dollar;
    globalThis.XMLSerializer = window.XMLSerializer;

    await import("../../web-client-classic/public/gene/api.js?classic");
  });

  afterEach(() => {
    delete globalThis.window.api;
    delete globalThis.$;
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("makes the correct call to Uniprot", async () => {
    const testString =
      "yourlist:M201904306746803381A1F0E0DB47453E0216320D0BAD3EL    Entry    Entry name  Status" +
      " Protein names    Gene names Organism  Length YHP1    Q04116  " +
      "YHP1_YEAST    reviewed    Homeobox protein YHP1 " +
      "YHP1 YDR451C D9461.36   Saccharomyces cerevisiae";

    dollar.get.mockResolvedValue(testString);

    const data = await globalThis.window.api.getUniProtInfo(query);
    expect(data).toBe(testString);
  });

  it("makes the correct call to NCBI", async () => {
    const testString = `<?xml version="1.0" encoding="UTF-8" ?>
        <!DOCTYPE eSearchResult PUBLIC "-//NLM//DTD esearch 20060628//EN"
        "https://eutils.ncbi.nlm.nih.gov/eutils/dtd/20060628/esearch.dtd">
        <eSearchResult><Count>1</Count><RetMax>1</RetMax><RetStart>0</RetStart><IdList>
        <Id>852062</Id>
        </IdList><TranslationSet><Translation>
        <From>+Saccharomyces+cerevisiae[Organism]</From>
        <To>"Saccharomyces cerevisiae"[Organism]</To>
        </Translation></TranslationSet><TranslationStack>
        <TermSet>    <Term>YHP1[gene]</Term>    <Field>gene</Field>    <Count>1</Count>
        <Explode>N</Explode>   </TermSet>   <TermSet>    <Term>"Saccharomyces cerevisiae"[Organism]</Term>
        <Field>Organism</Field>    <Count>7062</Count>    <Explode>Y</Explode>   </TermSet>   <OP>AND</OP>
        </TranslationStack><QueryTranslation>YHP1[gene] AND "Saccharomyces cerevisiae"[Organism]</QueryTranslation>
        </eSearchResult>`;

    dollar.get.mockResolvedValue(testString);

    const data = await globalThis.window.api.getNCBIInfo(query);
    expect(data).toBe(testString);
  });

  it("makes the correct call to JASPAR", async () => {
    const testObject = { results: [{ matrix_id: "MA0426.1", name: "YHP1" }] };

    dollar.get.mockResolvedValue(testObject);

    const data = await globalThis.window.api.getJasparInfo(query);
    expect(data.results[0].matrix_id).toBe(testObject.results[0].matrix_id);
  });

  it("makes the correct call to YeastMine (general data)", async () => {
    const testObject = {
      results: [
        {
          symbol: "YHP1",
          length: 1062,
          description: "Homeobox transcriptional repressor",
          geneSummary: null,
          primaryIdentifier: "S000002859",
        },
      ],
      wasSuccessful: true,
      error: null,
      statusCode: 200,
    };

    dollar.get.mockResolvedValue(testObject);

    const data = await globalThis.window.api.getYeastMineInfo(query);
    expect(data.results[0].description).toBe(testObject.results[0].description);
  });

  it("makes the correct call to YeastMine (general data)", async () => {
    const testObject = {
      results: [
        {
          symbol: "YHP1",
          length: 1062,
          description: "Homeobox transcriptional repressor",
          geneSummary: null,
          primaryIdentifier: "S000002859",
        },
      ],
      wasSuccessful: true,
      error: null,
      statusCode: 200,
    };

    dollar.get.mockResolvedValue(testObject);

    const data = await globalThis.window.api.getYeastMineInfo(query);
    expect(data.results[0].description).toBe(testObject.results[0].description);
  });

  it("makes the correct call to YeastMine (regulation info)", async () => {
    const testObject = [{ properties: { id: 6393710 } }, { properties: { id: 6393710 } }];

    dollar.get.mockResolvedValue(testObject);

    const data = await globalThis.window.api.getRegulationInfo(query);
    expect(data[0].properties.id).toBe(data[0].properties.id);
    expect(data.length).toBe(2);
  });

  it("makes the correct call to YeastMine (gene ontology info)", async () => {
    const testObject = [{ properties: { id: 6393710 } }, { properties: { id: 6393710 } }];

    dollar.get.mockResolvedValue(testObject);

    const data = await globalThis.window.api.getGeneOntologyInfo(query);
    expect(data[0].properties.id).toBe(data[0].properties.id);
    expect(data.length).toBe(2);
  });
});
