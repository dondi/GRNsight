import { Box } from "grommet";
export default function DottedLine({ width }) {
  return (
    <Box
      width={width || "100%"}
      alignSelf="center"
      margin={width ? undefined : { vertical: "9px" }}
      border={{
        color: "#bbb",
        side: "top",
        style: "dotted",
        size: "1px",
      }}
    ></Box>
  );
}
