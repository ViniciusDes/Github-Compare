import React from "react";

const Button = (props) => (
  <button onClick={props.onClick} value={props.value}>
    {props.children}
  </button>
);

export default Button;
