import { useContext, useState, useMemo, useRef } from "react";
import { GrnStateContext } from "../App";
import {
  ZOOM_DISPLAY_MINIMUM,
  ZOOM_DISPLAY_MAXIMUM,
  ZOOM_SLIDER_MIN,
  ZOOM_SLIDER_MIDDLE,
  ZOOM_SLIDER_MAX,
  zoomScaleSliderLeft,
  zoomScaleSliderRight,
} from "../helpers/constants";
import {
  flexZoomInBounds,
  viewportBoundsMoveDrag,
} from "../helpers/restrictGraphToViewportHelpers";
import { NETWORK_GRN_MODE_FULL, NETWORK_PPI_MODE_FULL } from "../helpers/constants";
import "../App.css";

export default function ScaleAndScroll(nodes, width, height, xTranslation, yTranslation) {
  const frame = useRef(null);
  const [zoomSliderValue, setZoomSliderValue] = useState(null);
  const { zoomPercent, setZoomPercent, networkMode, adaptive } = useContext(GrnStateContext);

  const handleSliderChange = event => {
    const sliderInput = parseFloat(event.target.value);
    console.log("sliderInput: ", sliderInput);

    // TODO: add Restrict Graph to Viewport support like flexZoomInBounds in classic
    const scaleToUse =
      sliderInput <= ZOOM_SLIDER_MIDDLE ? zoomScaleSliderLeft() : zoomScaleSliderRight();
    if (
      adaptive ||
      (!adaptive &&
        flexZoomInBounds(
          sliderInput,
          nodes,
          width,
          height,
          xTranslation,
          yTranslation
        ))
    ) {
      const finalDisplay = Math.floor(scaleToUse(sliderInput));
      console.log("finalDisplay: ", finalDisplay);
      setZoomSliderValue(sliderInput);

      if (frame.current) cancelAnimationFrame(frame.current); // Cancel any pending animation frame to prevent queuing up too many frames

      frame.current = requestAnimationFrame(() => {
        setZoomPercent(finalDisplay);
      });
    }
  };

  return (
    <div className="scale-and-scroll">
      <table className="scrollTable">
        <tbody>
          <tr>
            <td></td>
            <td className="scrollBtn scrollUp">
              <p className="movementArrow">&#8593;</p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="scrollBtn scrollLeft">
              <p className="movementArrow">&#8592;</p>
            </td>
            <td className="scrollBtn center">
              <p className="movementArrow">&#9788;</p>
            </td>
            <td className="scrollBtn scrollRight">
              <p className="movementArrow">&#8594;</p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="scrollBtn scrollDown">
              <p className="movementArrow">&#8595;</p>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <span className="pull-left zoomLabel">
        <b>
          Zoom (<span className="minimum-zoom-display">{ZOOM_DISPLAY_MINIMUM}</span>
          &ndash;
          <span className="maximum-zoom-display">{ZOOM_DISPLAY_MAXIMUM}</span>
          %):&nbsp;
        </b>
      </span>
      <span className="pull-right zoomLabel" id="zoomPercent">
        {zoomPercent}%
      </span>
      <br />
      <table className="zoomTable">
        <tbody>
          <tr>
            <td>
              <div className="zoomCenter"></div>
              <input
                id="zoomSlider"
                className="zoom"
                type="range"
                min={ZOOM_SLIDER_MIN}
                max={ZOOM_SLIDER_MAX}
                value={zoomSliderValue ?? ZOOM_SLIDER_MIDDLE}
                onChange={handleSliderChange}
                step="0.25"
                disabled={
                  networkMode !== NETWORK_GRN_MODE_FULL && networkMode !== NETWORK_PPI_MODE_FULL
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
