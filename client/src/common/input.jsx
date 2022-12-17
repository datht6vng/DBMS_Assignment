import React, { Component } from "react";
import "./input.css";

const Input = (props) => {
  const { name, label, error, ...rest } = props;

  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
      <input
        id={name}
        name={name}
        {...rest}
        className="form-control"
        placeholder={label}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
