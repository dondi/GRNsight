import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App.jsx";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    // Just rendering the App component will execute the createContext line
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

//   TODO: fix this test
//   it("provides context to child components", () => {
//     render(<App />);
//     // Any component that uses the context will trigger the context line
//     // For example, if Sidebar uses the context:
//     expect(screen.getByText("Navbar")).toBeInTheDocument();
//   });
});


