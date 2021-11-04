import React from "react";
import ReactDOM from "react-dom";
import { Stars } from "@design-system";

ReactDOM.render(
  <div>
    <Stars number={1} />
    <Stars number={1.5} />
    <Stars number={2} />
    <Stars number={2.5} />
    <Stars number={3} />
    <Stars number={3.5} />
    <Stars number={4} />
    <Stars number={4.5} />
    <Stars number={5} />
  </div>,
  document.getElementById("js-example")
);
