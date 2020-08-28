import React from "react";

import PropTypes from "prop-types";

const Input = (props) => (
  <input
    type="text"
    placeholder="Usuário/repositorio"
    value={props.value}
    onChange={props.onChange}
  ></input>
);

export default Input;
