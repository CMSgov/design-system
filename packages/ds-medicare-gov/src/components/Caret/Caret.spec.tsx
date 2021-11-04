import React from "react";
import { render, cleanup } from "@testing-library/react";
import Caret from "./Caret";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<Caret />);
  expect(container).toBeInTheDocument();
});
