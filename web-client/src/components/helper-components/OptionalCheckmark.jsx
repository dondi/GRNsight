import { Box } from "grommet";
import { Checkmark } from "grommet-icons";
import "../../App.css";
export default function OptionalCheckmark({ chosenViewSize, viewSize }) {
  return chosenViewSize === viewSize ? (
    <div className="checkmark-container">
      <Checkmark size="14px" />
    </div>
  ) : (
    <span className="empty-checkmark"></span>
  );
}
