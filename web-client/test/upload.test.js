import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  UPLOAD_SIZE_LIMIT_BYTES,
  returnUploadRoute,
  validateUploadFile,
  trackUploadAnalytics,
  extractWorkbookErrorMessage,
  annotateWorkbookLinks,
} from "../src/services/upload";

describe("upload service", () => {
  let originalGa;

  beforeEach(() => {
    originalGa = window.ga;
    delete window.ga;
  });

  afterEach(() => {
    if (originalGa) {
      window.ga = originalGa;
    } else {
      delete window.ga;
    }
    vi.restoreAllMocks();
  });

  it("returnUploadRoute handles demo files, known extensions, and unknown extensions", () => {
    expect(returnUploadRoute("demo-file", ["demo-file"])).toBe("demo-file");
    expect(returnUploadRoute("network.xlsx")).toBe("upload");
    expect(returnUploadRoute("network.sif")).toBe("upload-sif");
    expect(returnUploadRoute("network.graphml")).toBe("upload-graphml");
    expect(returnUploadRoute("network.txt")).toBeUndefined();
  });

  it("validateUploadFile handles no file, oversized file, unsupported file, and valid file", () => {
    expect(validateUploadFile(undefined)).toBe("No file selected.");

    const oversizedFile = { name: "big.xlsx", size: UPLOAD_SIZE_LIMIT_BYTES };
    expect(validateUploadFile(oversizedFile)).toBe(
      "The file uploaded is too large. Please try again with a file smaller than 1 MB."
    );

    const unsupportedFile = { name: "bad.txt", size: 10 };
    expect(validateUploadFile(unsupportedFile)).toBe(
      "Unsupported file type. Please upload a .xlsx, .sif, or .graphml file."
    );

    const validFile = { name: "ok.xlsx", size: 10 };
    expect(validateUploadFile(validFile)).toBeNull();
  });

  it("trackUploadAnalytics sends pageview when ga is available", () => {
    window.ga = vi.fn();

    trackUploadAnalytics();

    expect(window.ga).toHaveBeenCalledWith("send", "pageview", {
      page: "/GRNsight/upload",
      sessionControl: "start",
    });
  });

  it("extractWorkbookErrorMessage handles empty, string, message, and errors array", () => {
    expect(extractWorkbookErrorMessage(undefined)).toBe("Your graph failed to load.");
    expect(extractWorkbookErrorMessage("raw error string")).toBe("raw error string");
    expect(extractWorkbookErrorMessage({ message: "message from server" })).toBe(
      "message from server"
    );

    const arrayError = {
      errors: [
        { possibleCause: "cause one", suggestedFix: "fix one" },
        { possibleCause: "cause two", suggestedFix: "fix two" },
      ],
    };

    expect(extractWorkbookErrorMessage(arrayError)).toBe("cause one fix onecause two fix two");
  });

  it("annotateWorkbookLinks annotates unweighted, positive, and non-positive links", () => {
    const workbook = {
      sheetType: "unweighted",
      links: [{ value: 2 }, { value: -3 }, { value: 0 }, {}],
    };

    const annotated = annotateWorkbookLinks(workbook);

    expect(annotated.links[0].type).toBe("arrowhead");
    expect(annotated.links[0].stroke).toBe("rgb(195, 61, 61)");

    expect(annotated.links[1].type).toBe("repressor");
    expect(annotated.links[1].stroke).toBe("rgb(51, 124, 183)");

    // Unweighted links with missing/zero values should default to 1 and be arrowheads.
    expect(annotated.links[2].value).toBe(1);
    expect(annotated.links[2].type).toBe("arrowhead");
    expect(annotated.links[3].value).toBe(1);
    expect(annotated.links[3].type).toBe("arrowhead");

    expect(annotated.positiveWeights).toEqual([2, 1, 1]);
    expect(annotated.negativeWeights).toEqual([-3]);
  });
});
