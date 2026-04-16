export const UPLOAD_SIZE_LIMIT_BYTES = 2000000;

export const createFileForm = file => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};

export const returnUploadRoute = (filename, demoFiles = []) => {
  if (demoFiles.includes(filename)) {
    return filename;
  }

  const lowerName = filename.toLowerCase();

  if (lowerName.endsWith(".xlsx")) {
    return "upload";
  }

  if (lowerName.endsWith(".sif")) {
    return "upload-sif";
  }

  if (lowerName.endsWith(".graphml")) {
    return "upload-graphml";
  }

  return undefined;
};

export const validateUploadFile = file => {
  if (!file) {
    return "No file selected.";
  }

  if (file.size >= UPLOAD_SIZE_LIMIT_BYTES) {
    return "The file uploaded is too large. Please try again with a file smaller than 1 MB.";
  }

  if (!returnUploadRoute(file.name)) {
    return "Unsupported file type. Please upload a .xlsx, .sif, or .graphml file.";
  }

  return null;
};

export const trackUploadAnalytics = () => {
  if (window.ga) {
    window.ga("send", "pageview", {
      page: "/GRNsight/upload",
      sessionControl: "start",
    });
  }
};

export const extractWorkbookErrorMessage = errorData => {
  if (!errorData) {
    return "Your graph failed to load.";
  }

  if (!errorData.errors || !Array.isArray(errorData.errors)) {
    if (typeof errorData === "string") {
      return errorData;
    }

    return errorData.message || "Your graph failed to load.";
  }

  return errorData.errors.reduce((message, currentError) => {
    const possibleCause = currentError.possibleCause || "";
    const suggestedFix = currentError.suggestedFix || "";
    return `${message}${possibleCause} ${suggestedFix}`.trim();
  }, "");
};

export const annotateWorkbookLinks = workbook => {
  const normalizedWorkbook = { ...workbook };
  normalizedWorkbook.links = Array.isArray(workbook?.links) ? [...workbook.links] : [];
  normalizedWorkbook.positiveWeights = [];
  normalizedWorkbook.negativeWeights = [];

  normalizedWorkbook.links = normalizedWorkbook.links.map(link => {
    const annotatedLink = { ...link };

    if (normalizedWorkbook.sheetType === "unweighted" && !annotatedLink.value) {
      annotatedLink.value = 1;
    }

    if (annotatedLink.value > 0) {
      annotatedLink.type = "arrowhead";
      annotatedLink.stroke = "rgb(195, 61, 61)";
      normalizedWorkbook.positiveWeights.push(annotatedLink.value);
    } else {
      annotatedLink.type = "repressor";
      annotatedLink.stroke = "rgb(51, 124, 183)";
      normalizedWorkbook.negativeWeights.push(annotatedLink.value);
    }

    return annotatedLink;
  });

  return normalizedWorkbook;
};
