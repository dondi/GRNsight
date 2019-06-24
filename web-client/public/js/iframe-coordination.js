/**
 * This script is for use by the top-level GRNsight website, in order to coordinate sizing between the
 * host site and the embedded GRNsight application. It is meant to be executed _in the host site_
 * via a standard `script` element.
 *
 * Prerequisites: jQuery and the iFrame Resizer library (v4.1.1 at this writing) must already be
 *                loaded into the web browser when this script executes.
 */
iFrameResize({
    checkOrigin: ["https://dondi.github.io", "https://grnsight.cs.lmu.edu"],
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

const sendDimensions = (destination, origin) => {
    const iframeOffset = $("iframe.embedded-demo").offset();
    const displayWidth = $(window).width() - iframeOffset.left;

    let displayHeight = $(window).height() - iframeOffset.top;
    if (displayHeight < SMALL_HEIGHT) {
        displayHeight = SMALL_HEIGHT;
    } else if (displayHeight > SMALL_HEIGHT && displayHeight < LARGE_HEIGHT) {
        displayHeight = MEDIUM_HEIGHT;
    }

    destination.postMessage(
        {
            width: displayWidth,
            height: displayHeight + HEIGHT_PADDING
        },

        origin
    );
};

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
    document.querySelector("iframe.embedded-demo").contentWindow, "https://grnsight.cs.lmu.edu"
));
