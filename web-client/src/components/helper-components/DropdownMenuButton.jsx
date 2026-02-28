import { Button, Text } from "grommet";
export default function DropdownMenuButton({ text }) {
  return (
    <Button margin={{ horizontal: "20px", top: "3px" }}>
      <Text>{text}</Text>
    </Button>
  );
}
