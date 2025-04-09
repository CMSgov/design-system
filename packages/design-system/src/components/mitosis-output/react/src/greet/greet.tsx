"use client";
import * as React from "react";
import { useState } from "react";

function Greet(props: any) {
  const [name, setName] = useState(() => "");

  return (
    <div>
      <input
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div>Hello, {name}!</div>
    </div>
  );
}

export default Greet;
