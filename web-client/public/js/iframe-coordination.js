/* eslint-disable */
// ^^^^^ Disabled because this code is meant to be run in the host website and explicitly relies
//       on top-level names like iFrameResize and jQuery ($).

/**
 * This script is for use by the top-level GRNsight website, in order to coordinate sizing between the
 * host site and the embedded GRNsight application. It is meant to be executed _in the host site_
 * via a standard `script` element.
 *
 * Prerequisites: jQuery and the iFrame Resizer library (v4.1.1 at this writing) must already be
 *                loaded into the web browser when this script executes.
 */
iFrameResize({
  checkOrigin: ["http://localhost:8080", "http://localhost:5001"],
  widthCalculationMethod: "taggedElement",
  heightCalculationMethod: "taggedElement",
  sizeWidth: true,
  minWidth: 1081  // Based on minimum width page body and title elements.
}, "iframe.embedded-demo");

const HEIGHT_OFFSET = 53;
const HEIGHT_PADDING = 20;

const SMALL_HEIGHT = 648 + HEIGHT_OFFSET;
const MEDIUM_HEIGHT = 840 + HEIGHT_OFFSET;
const LARGE_HEIGHT = 1080 + HEIGHT_OFFSET;
const FIT_MARGIN = 4;  // A little space so that "fit" isn’t totally flush with window bounds.

const sendDimensions = (destination, origin) => {
  const iframeOffset = $("iframe.embedded-demo").offset();
  console.log("*****************SEND DIMENSIONS CALLED******************")
  destination.postMessage(
    {
      width: $(window).width() - iframeOffset.left,
      height: $(window).height() - FIT_MARGIN,
      top: iframeOffset.top
    },

    origin
  );
};

window.addEventListener("message", event => {
  console.log("HELLLLLOOOOO FROM WINDOW EVENT LISTENER")
  if (event.origin.indexOf("http://localhost:5001/") !== 0) {
    // Ignore any message that did not originate from the GRNsight web client server.
    console.log("we do not send message from iframe-coordination");
    return;
  }

  console.log("look here at iframe-coordination because this is where error with fit to viewport may be happening");

  if (event.data === "dimensions") {
    console.log("***************DIMENSIONS SENT******************")
    sendDimensions(event.source, event.origin);
  }
});

window.addEventListener("resize", () => sendDimensions(
  document.querySelector("iframe.embedded-demo").contentWindow, "http://localhost:5001/"
));
