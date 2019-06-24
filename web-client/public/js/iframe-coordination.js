/**
 * This script is for use by the top-level GRNsight website, in order to coordinate sizing between the
 * host site and the embedded GRNsight application. It is meant to be executed _in the host site_
 * via a standard `script` element.
 *
 * Prerequisite: The iFrame Resizer library (v4.1.1 at this writing) must already be loaded into the
 *               web browser when this script is loaded.
 */
iFrameResize({
  checkOrigin: ["https://dondi.github.io", "https://grnsight.cs.lmu.edu"],
  widthCalculationMethod: "taggedElement",
  heightCalculationMethod: "taggedElement",
  sizeWidth: true,
  minWidth: 1081  // Based on minimum width page body and title elements.
}, "iframe.embedded-demo");

const sendDimensions = (destination, origin) => destination.postMessage(
  { width: window.innerWidth, height: window.innerHeight }, origin
);

document.querySelector("iframe.embedded-demo").addEventListener("message", event => {
  if (event.origin.indexOf("https://grnsight.cs.lmu.edu") !== 0) {
    // Ignore any message that did not originate from the GRNsight web client server.
    return;
  }

  if (event.data === "dimensions") {
    sendDimensions(event.source, event.origin);
  }
});

window.addEventListener("resize", () => sendDimensions(
  document.querySelector("iframe.embedded-demo"), "https://grnsight.cs.lmu.edu"
));
