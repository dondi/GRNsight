import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App.jsx";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    // Just rendering the App component will execute the createContext line
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("toggles sidebar collapsed state when toggle button is clicked", () => {
    render(<App />);

    const toggleButton = document.getElementById("sidebar-toggle");
    expect(toggleButton).toBeTruthy();
    expect(toggleButton?.classList.contains("collapsed")).toBe(false);

    fireEvent.click(toggleButton);

    expect(toggleButton?.classList.contains("collapsed")).toBe(true);
  });
});
