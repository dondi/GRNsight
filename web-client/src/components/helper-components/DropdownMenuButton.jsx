import { Button, Text } from "grommet";
export default function DropdownMenuButton({ text, onClick }) {
  return (
    <Button margin={{ horizontal: "20px", top: "3px" }} onClick={onClick}>
      <Text>{text}</Text>
    </Button>
  );
}
