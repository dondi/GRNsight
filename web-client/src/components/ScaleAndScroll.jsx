import { useContext, useState } from "react";
import { GrnStateContext } from "../App";
import { ZOOM_DISPLAY_MINIMUM_VALUE, ZOOM_DISPLAY_MAXIMUM_VALUE } from "../helpers/constants";
import { NETWORK_GRN_MODE_FULL, NETWORK_PPI_MODE_FULL } from "../helpers/constants";
import "../App.css";

export default function ScaleAndScroll() {
  const [zoomValue, setZoomValue] = useState(null);
  const { zoomPercent, setZoomPercent, networkMode } = useContext(GrnStateContext);

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
          Zoom (<span className="minimum-zoom-display">{ZOOM_DISPLAY_MINIMUM_VALUE}</span>
          &ndash;
          <span className="maximum-zoom-display">{ZOOM_DISPLAY_MAXIMUM_VALUE}</span>
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
                min="25"
                max="200"
                value={zoomPercent}
                // defaultValue="100"
                onChange={e => {
                  const sliderValue = parseFloat(e.target.value);
                  setZoomPercent(Math.round(sliderValue));
                }}
                step="0.1"
                // TODO: will need to set a state to make this dynamic
                // TODO: make sure that this always stays blue even when computer in dark mode
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
