import "../App.css";

export default function ScaleAndScroll() {
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
      {/* <table className="zoomTable">
        <tbody>
          <tr>
            <td>
              <div className="zoomCenter"></div>
              <input
                id="zoomSlider"
                className="zoom"
                type="range"
                min="0"
                max="8"
                defaultValue="4"
                step="0.25"
                // TODO: will need to set a state to make this dynamic
                disabled={true}
              />
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}
