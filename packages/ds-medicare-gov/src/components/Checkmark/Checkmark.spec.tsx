import React from "react";
import { render, cleanup } from "@testing-library/react";
import Checkmark from "./Checkmark";

afterEach(cleanup);

it("renders without crashing", () => {
  const { container } = render(<Checkmark />);
  expect(container).toBeInTheDocument();
});
