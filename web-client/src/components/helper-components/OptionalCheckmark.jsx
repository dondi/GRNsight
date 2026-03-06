import { Checkmark } from "grommet-icons";
import "../../App.css";
export default function OptionalCheckmark({ desiredValue, currentValue }) {
  return currentValue === desiredValue ? (
    <div className="checkmark-container">
      <Checkmark size="14px" />
    </div>
  ) : (
    <span className="empty-checkmark"></span>
  );
}
