import React from "react";
import ReactDOM from "react-dom";
import { NavigationMenu } from "@design-system";

ReactDOM.render(
  <NavigationMenu alwaysShowMenuButton={true}>
    <li className="m-c-navigationMenu__item">
      <a href="/">{"Menu item 1"}</a>
    </li>
    <li className="m-c-navigationMenu__item">
      <a href="/">{"Menu item 2"}</a>
    </li>
    <li className="m-c-navigationMenu__item">
      <hr />
    </li>
    <li className="m-c-navigationMenu__item">
      <a href="/">{"Menu item 2"}</a>
    </li>
  </NavigationMenu>,
  document.getElementById("js-example")
);
