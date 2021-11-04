import React from "react";
import { render, cleanup } from "@testing-library/react";
import No from "./No";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<No />);
  expect(container).toBeInTheDocument();
});
