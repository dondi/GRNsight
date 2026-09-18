import { Button, Text } from "grommet";

export default function DropdownMenuButton({ text, onClick, href, target, rel }) {
  if (href) {
    return (
      <a
        className="dropdown-menu-link"
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
      >
        <Text>{text}</Text>
      </a>
    );
  }

  // If no href is provided, render a regular button that triggers the onClick handler
  return (
    <Button margin={{ horizontal: "20px", top: "3px" }} onClick={onClick}>
      <Text>{text}</Text>
    </Button>
  );
}
