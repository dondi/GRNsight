import { useContext, useState, useMemo, useRef } from "react";
import { GrnStateContext } from "../App";
import {
  ZOOM_DISPLAY_MINIMUM,
  ZOOM_DISPLAY_MIDDLE,
  ZOOM_DISPLAY_MAXIMUM,
  ZOOM_SLIDER_MIN,
  ZOOM_SLIDER_MIDDLE,
  ZOOM_SLIDER_MAX,
  zoomScaleLeft,
  zoomScaleRight,
  zoomScaleSliderLeft,
  zoomScaleSliderRight,
} from "../helpers/constants";
import {
  flexZoomInBounds,
  viewportBoundsMoveDrag,
} from "../helpers/restrictGraphToViewportHelpers";
import { NETWORK_GRN_MODE_FULL, NETWORK_PPI_MODE_FULL } from "../helpers/constants";
import "../App.css";

export default function ScaleAndScroll({ getViewportBoundsData }) {
  const frame = useRef(null);
  const [zoomSliderValue, setZoomSliderValue] = useState(null);
  const { zoomPercent, setZoomPercent, networkMode, adaptive } = useContext(GrnStateContext);

  const handleSliderChange = event => {
    const sliderInput = parseFloat(event.target.value);
    const viewportBoundsData = !adaptive ? getViewportBoundsData() : undefined;
    // 1) slider position -> display percent
    const displayMapper =
      sliderInput <= ZOOM_SLIDER_MIDDLE ? zoomScaleSliderLeft() : zoomScaleSliderRight();
    const newZoomPercent = Math.floor(displayMapper(sliderInput));

    // 2) display percent -> graph scale
    const graphMapper = newZoomPercent <= ZOOM_DISPLAY_MIDDLE ? zoomScaleLeft() : zoomScaleRight();
    const newGraphZoom = graphMapper(newZoomPercent);

    if (
      adaptive ||
      (!adaptive &&
        viewportBoundsData?.nodes?.length > 0 &&
        flexZoomInBounds(
          newGraphZoom,
          viewportBoundsData.zoomScale,
          viewportBoundsData.nodes,
          viewportBoundsData.width,
          viewportBoundsData.height,
          viewportBoundsData.xTranslation,
          viewportBoundsData.yTranslation
        ))
    ) {
      setZoomSliderValue(sliderInput);

      if (frame.current) cancelAnimationFrame(frame.current); // Cancel any pending animation frame to prevent queuing up too many frames

      frame.current = requestAnimationFrame(() => {
        setZoomPercent(newZoomPercent);
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
