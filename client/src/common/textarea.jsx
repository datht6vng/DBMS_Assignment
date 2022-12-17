import React, { Component } from "react";
import "./textarea.css";

const Textarea = (props) => {
  const { name, label, error, ...rest } = props;

  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
      <textarea
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

export default Textarea;
