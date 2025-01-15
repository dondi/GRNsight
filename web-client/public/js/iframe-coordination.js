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

// ********THIS IS STABLE
const sendDimensions = async (destination, origin) => {

  console.log("***************DIMENSIONS SENT******************");
  const iframeOffset = $("iframe.embedded-demo").offset();
  console.log("destination", destination, "origin", origin);
  console.log("message posted to iframe: ", {
    width: $(window).width() - iframeOffset.left,
    height: $(window).height() - FIT_MARGIN,
    top: iframeOffset.top,
  }, origin);
 
  destination.postMessage(
    {
      width: $(window).width() - iframeOffset.left,
      height: $(window).height() - FIT_MARGIN,
      top: iframeOffset.top
    },

    origin
  );
};


// const sendDimensions = async (destination, origin) => {
//   try {
//     console.log("***************DIMENSIONS SENT******************");
//     const iframeOffset = $("iframe.embedded-demo").offset();
//     console.log(
//       "message posted to iframe: ",
//       {
//         width: $(window).width() - iframeOffset.left,
//         height: $(window).height() - FIT_MARGIN,
//         top: iframeOffset.top,
//       },
//       origin
//     );

//     const dimensions = {
//       width: $(window).width() - iframeOffset.left,
//       height: $(window).height() - FIT_MARGIN,
//       top: iframeOffset.top
//     }

//     // Await response from the iframe
//     const response = await sendMessageAndWaitForResponse(
//       dimensions,
//       origin,
//       destination
//     );
//     console.log("Received response: ", response);
//   } catch (error) {
//     console.error("Error sending dimensions: ", error);
//   }
// };

// const sendMessageAndWaitForResponse = async (dimensions, targetOrigin, targetWindow) => {
//   return new Promise((resolve, reject) => {
//     // Set up the message event listener
//     function handleMessage(event) {
//       console.log("HANDLEMESSAGE IS RUNNING");
//       if (event.origin !== targetOrigin) return; // Ignore messages from unexpected origins

//       console.log("EVENT.DATA ===", event.data, "EVENT", event)
//       if (event.data.type === "dimensionsResponse") {
//         window.removeEventListener("message", handleMessage); // Clean up the listener
//         resolve(event.data); // Resolve with the response data
//       }
//     }

//     window.addEventListener("message", handleMessage);

//     // Send the message
//     targetWindow.postMessage(dimensions, targetOrigin);

//     // Add a timeout to reject if no response is received
//     setTimeout(() => {
//       window.removeEventListener("message", handleMessage); // Clean up on timeout
//       reject(new Error("Timeout waiting for response"));
//     }, 5000); // 5-second timeout
//   });
// };

// window.addEventListener("message", async (event) => {
//   console.log("event.origin: ", event.origin, "event.data", event.data);
//   // if (event.origin.indexOf("http://localhost:8080/") !== 0) {
//   //   // Ignore any message that did not originate from the GRNsight web client server.
//   //   console.log("we do not send message from iframe-coordination");
//   //   return;
//   // }

//   if (event.data === "dimensions") {
//     console.log("*****************SEND DIMENSIONS CALLED******************");
//     await sendDimensions(event.source, event.origin);
//   }
// });



// ***************** THIS IS STABLE
window.addEventListener("message", event => {
  console.log(
    "event.origin: ",
    event.origin,
    "event.data",
    event.data,
    "event.origin.indexOf localhost 8080",
    event.origin.indexOf("http://localhost:8080/"),
    "event.origin.indexOf localhost 5001",
    event.origin.indexOf("http://localhost:5001/")
  );
  if (event.origin != "http://localhost:8080" && event.origin != "http://localhost:5001") {
    // Ignore any message that did not originate from the GRNsight web client server.
    console.log("we do not send message from iframe-coordination");
    return;
  }

  if (event.data === "dimensions") {
    console.log("***************DIMENSIONS SENT******************")
    sendDimensions(event.source, event.origin);
  }
});

window.addEventListener("resize", () =>
  sendDimensions(
    document.querySelector("iframe.embedded-demo").contentWindow,
    "http://localhost:5001/"
  )
);
