import * as d3 from "d3";
import { useContext, useState, useMemo } from "react";
import { GrnStateContext } from "../App";
import {
  ZOOM_DISPLAY_MINIMUM,
  ZOOM_DISPLAY_MAXIMUM,
  ZOOM_DISPLAY_MIDDLE,
  ZOOM_SLIDER_MIN,
  ZOOM_SLIDER_MIDDLE,
  ZOOM_SLIDER_MAX,
} from "../helpers/constants";
import { NETWORK_GRN_MODE_FULL, NETWORK_PPI_MODE_FULL } from "../helpers/constants";
import "../App.css";

export default function ScaleAndScroll() {
  const [zoomSliderValue, setZoomSliderValue] = useState(null);
  const { zoomPercent, setZoomPercent, networkMode } = useContext(GrnStateContext);
  // Supports non-linear zoom scale so that 100% in the middle of slider
  const createZoomScale = (domainMin, domainMax, rangeMin, rangeMax) =>
    d3.scaleLinear().domain([domainMin, domainMax]).range([rangeMin, rangeMax]).clamp(true);

  const zoomScaleSliderLeft = useMemo(
    () =>
      createZoomScale(
        ZOOM_SLIDER_MIN,
        ZOOM_SLIDER_MIDDLE,
        ZOOM_DISPLAY_MINIMUM,
        ZOOM_DISPLAY_MIDDLE
      ),
    []
  );

  const zoomScaleSliderRight = useMemo(
    () =>
      createZoomScale(
        ZOOM_SLIDER_MIDDLE,
        ZOOM_SLIDER_MAX,
        ZOOM_DISPLAY_MIDDLE,
        ZOOM_DISPLAY_MAXIMUM
      ),
    []
  );

  const handleSliderChange = e => {
    const sliderInput = parseFloat(e.target.value);
    setZoomSliderValue(sliderInput);
    // TODO: add Restrict Graph to Viewport support like flexZoomInBounds in classic
    const finalDisplay = Math.floor(
      (sliderInput <= ZOOM_SLIDER_MIDDLE ? zoomScaleSliderLeft : zoomScaleSliderRight)(sliderInput)
    );
    setZoomPercent(finalDisplay);
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
                value={zoomSliderValue ? zoomSliderValue : ZOOM_SLIDER_MIDDLE}
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
