import React from "react";
import { render, cleanup } from "@testing-library/react";
import SimpleFooter from "./SimpleFooter";

afterEach(cleanup);

it("renders without crashing", () => {
  const { getByText } = render(
    <SimpleFooter aboutMedicareLabel="About SimpleFooter" />
  );

  expect(getByText(/about SimpleFooter/i)).toBeInTheDocument();
});
