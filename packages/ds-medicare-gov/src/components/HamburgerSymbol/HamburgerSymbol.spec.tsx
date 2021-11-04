import React from "react";
import { render, cleanup } from "@testing-library/react";
import HamburgerSymbol from "./HamburgerSymbol";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<HamburgerSymbol />);
  expect(container).toBeInTheDocument();
});
