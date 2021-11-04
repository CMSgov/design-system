import React from "react";
import { render, cleanup } from "@testing-library/react";
import HHSlogo from "./HHSlogo";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<HHSlogo />);
  expect(container).toBeInTheDocument();
});
