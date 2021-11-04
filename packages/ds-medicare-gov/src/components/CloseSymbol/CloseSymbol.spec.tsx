import React from "react";
import { render, cleanup } from "@testing-library/react";
import CloseSymbol from "./CloseSymbol";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<CloseSymbol />);
  expect(container).toBeInTheDocument();
});
