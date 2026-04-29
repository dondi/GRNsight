import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, Form, Layer, Select, Text, TextInput } from "grommet";
import { Database, FormClose, Search } from "grommet-icons";
import { GrnStateContext } from "../App";
import {
  NETWORK_GRN_MODE_FULL,
  NETWORK_GRN_MODE_SHORT,
  NETWORK_PPI_MODE_FULL,
  NETWORK_PPI_MODE_SHORT,
  MAX_GENES,
  MAX_EDGES,
} from "../helpers/constants";
import {
  queryNetworkDatabase,
  queryProteinProteinDatabase,
  uploadCustomWorkbook,
} from "../services/api";
import {
  EMPTY_WORKBOOK,
  modeOptions,
  getFirstSource,
  isValidGene,
  countEdges,
  sortWorkbookGenes,
} from "../helpers/loadFromDbHelpers";
import "../App.css";

export default function LoadFromDbModal({ margin }) {
  const { setDemoValue, setNetworkData, setNetworkMode } = useContext(GrnStateContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingSources, setIsLoadingSources] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [customWorkbook, setCustomWorkbook] = useState(EMPTY_WORKBOOK);

  const sourceOptions = useMemo(() => {
    if (customWorkbook.type === NETWORK_PPI_MODE_SHORT) {
      return Object.keys(customWorkbook.sources.proteinProteinInteractions ?? {});
    }

    return Object.keys(customWorkbook.sources.geneRegulation ?? {});
  }, [customWorkbook]);

  const geneProteinLabel = customWorkbook.type === NETWORK_PPI_MODE_SHORT ? "protein" : "gene";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isCancelled = false;
    const loadSources = async () => {
      setIsLoadingSources(true);
      setErrorMessage("");

      try {
        const [proteinResponse, networkResponse] = await Promise.all([
          queryProteinProteinDatabase({ type: "NetworkSource" }),
          queryNetworkDatabase({ type: "NetworkSource" }),
        ]);

        if (isCancelled) {
          return;
        }

        const proteinSources = proteinResponse?.sources ?? {};
        const geneSources = networkResponse?.sources ?? {};

        setCustomWorkbook({
          genes: {},
          type: NETWORK_GRN_MODE_SHORT,
          source: getFirstSource(geneSources),
          sources: {
            proteinProteinInteractions: proteinSources,
            geneRegulation: geneSources,
          },
        });
      } catch {
        if (!isCancelled) {
          setErrorMessage("Failed to load network sources. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingSources(false);
        }
      }
    };

    loadSources();

    return () => {
      isCancelled = true;
    };
  }, [isOpen]);

  const resetAndClose = () => {
    setIsOpen(false);
    setSearchValue("");
    setErrorMessage("");
    setCustomWorkbook(EMPTY_WORKBOOK);
  };

  const setWorkbookType = nextType => {
    setErrorMessage("");
    setSearchValue("");
    setCustomWorkbook(prev => {
      const nextSources =
        nextType === NETWORK_PPI_MODE_SHORT
          ? prev.sources.proteinProteinInteractions
          : prev.sources.geneRegulation;

      return {
        ...prev,
        type: nextType,
        genes: {},
        source: getFirstSource(nextSources),
      };
    });
  };

  const addGene = async () => {
    const userEntry = String(searchValue ?? "").trim();
    const normalized = isValidGene(userEntry.toUpperCase());

    if (!normalized) {
      setErrorMessage(
        [
          `${geneProteinLabel}: "${userEntry}" is not to GRNsight specifications.`,
          `${geneProteinLabel}s must be 12 characters or less, containing "-", "_",`,
          "and alpha-numeric characters only.",
        ].join(" ")
      );
      return;
    }

    if (!customWorkbook.source) {
      setErrorMessage("Select a source first.");
      return;
    }

    setErrorMessage("");
    setSearchValue("");

    try {
      if (customWorkbook.type === NETWORK_GRN_MODE_SHORT) {
        const sourceData = customWorkbook.sources.geneRegulation[customWorkbook.source];
        const response = await queryNetworkDatabase({
          type: "NetworkGeneFromSource",
          gene: normalized,
          source: sourceData?.source,
          timestamp: sourceData?.timestamp,
        });

        if (response?.geneId && response?.displayGeneId) {
          setCustomWorkbook(prev => ({
            ...prev,
            genes: {
              ...prev.genes,
              [response.geneId]: response.displayGeneId,
            },
          }));
        } else {
          setErrorMessage(
            `${geneProteinLabel}: "${userEntry}" was not found in this database. Please check for typos and try again.`
          );
        }
      } else {
        const sourceData = customWorkbook.sources.proteinProteinInteractions[customWorkbook.source];
        const response = await queryProteinProteinDatabase({
          type: "NetworkFromGeneProtein",
          geneProtein: normalized,
          source: sourceData?.source,
          timestamp: sourceData?.timestamp,
        });

        if (response?.standardName && response?.displayGeneId && response?.geneId) {
          setCustomWorkbook(prev => ({
            ...prev,
            genes: {
              ...prev.genes,
              [response.standardName]: {
                displayGeneID: response.displayGeneId,
                geneID: response.geneId,
              },
            },
          }));
        } else {
          setErrorMessage(
            `${geneProteinLabel}: "${userEntry}" was not found in this database. Please check for typos and try again.`
          );
        }
      }
    } catch {
      setErrorMessage("Could not query the selected source. Please try again.");
    }
  };

  const generateNetwork = async () => {
    const genesAmount = Object.keys(customWorkbook.genes).length;

    if (genesAmount === 0) {
      setErrorMessage("Network must have at least 1 gene or protein.");
      return;
    }

    if (genesAmount > MAX_GENES) {
      setErrorMessage(
        `GRNsight can handle at most ${MAX_GENES} genes/proteins. This network contains ${genesAmount}.`
      );
      return;
    }

    setErrorMessage("");
    setIsGenerating(true);

    try {
      const source = customWorkbook.source;
      const sortedGenes = sortWorkbookGenes(customWorkbook.genes, customWorkbook.type);

      if (customWorkbook.type === NETWORK_GRN_MODE_SHORT) {
        const genes = sortedGenes.map(([key]) => key);
        const displayGenes = sortedGenes.map(([, value]) => value);
        const sourceData = customWorkbook.sources.geneRegulation[source];

        const response = await queryNetworkDatabase({
          type: "GenerateNetwork",
          genes: genes.join(","),
          source: sourceData?.source,
          timestamp: sourceData?.timestamp,
        });

        const edgesAmount = countEdges(response?.links);
        if (edgesAmount > MAX_EDGES) {
          setErrorMessage(
            `GRNsight can handle at most ${MAX_EDGES} edges. This network contains ${edgesAmount}.`
          );
          return;
        }

        const links = [];
        console.log("Response links:", response?.links);
        Object.entries(response?.links ?? {}).forEach(([regulator, targets]) => {
          (targets ?? []).forEach(target => {
            if (customWorkbook.genes[regulator] && customWorkbook.genes[target]) {
              links.push(`${customWorkbook.genes[regulator]}->${customWorkbook.genes[target]}`);
            }
          });
        });

        const workbookName = `GRN (${source}; ${genes.length} genes, ${edgesAmount} edges)`;
        const workbook = {
          name: workbookName,
          genes: displayGenes.join(","),
          links: links.join(","),
          networkType: NETWORK_GRN_MODE_SHORT,
        };

        const generatedWorkbook = await uploadCustomWorkbook(workbook);
        setDemoValue(null);
        setNetworkData(generatedWorkbook);
        setNetworkMode(NETWORK_GRN_MODE_FULL);
        resetAndClose();
      } else {
        const proteins = sortedGenes.map(([key]) => key);
        const sourceData = customWorkbook.sources.proteinProteinInteractions[source];

        const response = await queryProteinProteinDatabase({
          type: "GenerateProteinNetwork",
          proteins: proteins.join(","),
          source: sourceData?.source,
          timestamp: sourceData?.timestamp,
        });

        const edgesAmount = countEdges(response?.links);
        if (edgesAmount > MAX_EDGES) {
          setErrorMessage(
            `GRNsight can handle at most ${MAX_EDGES} edges. This network contains ${edgesAmount}.`
          );
          return;
        }

        const links = [];
        Object.entries(response?.links ?? {}).forEach(([p1, targets]) => {
          (targets ?? []).forEach(p2 => {
            links.push(`${p1}->${p2}`);
          });
        });

        const workbookName = `PPI (${source}; ${proteins.length} proteins, ${edgesAmount} edges)`;
        const workbook = {
          name: workbookName,
          genes: proteins.join(","),
          links: links.join(","),
          networkType: NETWORK_PPI_MODE_SHORT,
        };

        const generatedWorkbook = await uploadCustomWorkbook(workbook);
        setDemoValue(null);
        setNetworkData(generatedWorkbook);
        setNetworkMode(NETWORK_PPI_MODE_FULL);
        resetAndClose();
      }
    } catch {
      setErrorMessage(
        "Unable to generate network. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button className="load-from-database" margin={margin} onClick={() => setIsOpen(true)}>
        <Box pad={{ vertical: "6px", horizontal: "12px" }} direction="row" gap="4px">
          <Database size="14px" />
          <Text size="14px">Load from Database</Text>
        </Box>
      </Button>

      {isOpen && (
        <Layer onEsc={resetAndClose} onClickOutside={resetAndClose} responsive={false}>
          <Box className="generate-network-modal">
            <Box
              className="generate-network-modal-header"
              direction="row"
              justify="between"
              align="center"
            >
              <Text weight="500" size="18px">
                Load from Database
              </Text>
              <Button
                className="generate-network-close"
                icon={<FormClose />}
                onClick={resetAndClose}
                pad="0"
              />
            </Box>
            <Box pad="20px">
              <Text size="30px" weight="500" margin={{ top: "20px", bottom: "10px" }}>
                Generate Network
              </Text>
              <Text margin={{ bottom: "24px" }}>
                Warning: changing network type or source will clear the list of selected genes or
                proteins below.
              </Text>
              {isLoadingSources ? (
                <Text>Loading network sources...</Text>
              ) : (
                <>
                  <Box className="generate-network-row" direction="row" align="center" gap="15px">
                    <Text className="generate-network-label" weight="bold">
                      Network Type
                    </Text>
                    <Box className="generate-network-select-wrap" flex>
                      <Select
                        className="generate-network-select"
                        options={modeOptions}
                        labelKey="label"
                        valueKey={{ key: "value", reduce: true }}
                        value={customWorkbook.type}
                        onChange={({ value }) => setWorkbookType(value)}
                        size="14px"
                      />
                    </Box>
                  </Box>

                  <Box className="generate-network-row" direction="row" align="center" gap="15px">
                    <Text className="generate-network-label" weight="bold">
                      Network Source
                    </Text>
                    <Box className="generate-network-select-wrap" flex>
                      <Select
                        className="generate-network-source-select"
                        options={sourceOptions}
                        value={customWorkbook.source}
                        disabled={sourceOptions.length === 0}
                        onChange={({ option }) => {
                          setErrorMessage("");
                          setCustomWorkbook(prev => ({
                            ...prev,
                            source: option,
                            genes: {},
                          }));
                        }}
                        size="14px"
                      />
                    </Box>
                  </Box>

                  <Form
                    onSubmit={event => {
                      event.preventDefault();
                      addGene();
                    }}
                  >
                    <Box className="generate-network-row" direction="row" align="center" gap="15px">
                      <Text className="generate-network-label" weight="bold">
                        Select {geneProteinLabel}
                      </Text>
                      <Box
                        className="generate-network-search-row"
                        direction="row"
                        align="center"
                        gap="small"
                      >
                        <TextInput
                          className="generate-network-search-input"
                          value={searchValue}
                          onChange={event => setSearchValue(event.target.value)}
                        />
                        <Button
                          className="generate-network-search-button"
                          type="submit"
                          icon={<Search size="20px" />}
                        />
                      </Box>
                    </Box>
                  </Form>

                  <Box className="selected-genes-container" pad={{ top: "small" }}>
                    <Text className="generate-network-added-text">
                      Added {geneProteinLabel}s go below! Click on a {geneProteinLabel} to remove
                      it.
                    </Text>
                    <Box direction="row" wrap gap="xsmall" margin={{ top: "small" }}>
                      {Object.entries(customWorkbook.genes).map(([key, value]) => {
                        const primaryName =
                          customWorkbook.type === NETWORK_GRN_MODE_SHORT ? value : key;
                        const secondaryName =
                          customWorkbook.type === NETWORK_GRN_MODE_SHORT
                            ? key
                            : `${value.displayGeneID} | ${value.geneID}`;

                        return (
                          <Button
                            key={key}
                            className="selected-gene-button"
                            onClick={() => {
                              setCustomWorkbook(prev => {
                                const nextGenes = { ...prev.genes };
                                delete nextGenes[key];
                                return {
                                  ...prev,
                                  genes: nextGenes,
                                };
                              });
                            }}
                          >
                            <Box pad={{ horizontal: "10px", vertical: "8px" }}>
                              <Text size="small" weight="bold">
                                {primaryName}
                              </Text>
                              <Text size="xsmall">({secondaryName})</Text>
                            </Box>
                          </Button>
                        );
                      })}
                    </Box>
                  </Box>
                </>
              )}
              {errorMessage && (
                <Box
                  className="generate-network-error"
                  pad={{ vertical: "xsmall", horizontal: "small" }}
                >
                  <Text size="small" color="#8b0000">
                    {errorMessage}
                  </Text>
                </Box>
              )}
            </Box>

            <Box className="generate-network-modal-footer" direction="row" justify="end" gap="10px">
              <Button
                className="generate-network-action-button"
                label={"Generate Network"}
                disabled={isLoadingSources ?? isGenerating}
                onClick={generateNetwork}
              />
              <Button
                className="generate-network-action-button"
                label="Cancel"
                onClick={resetAndClose}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
}
