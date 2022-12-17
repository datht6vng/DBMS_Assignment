import React, { Component } from "react";
import "./select.css";

const Select = (props) => {
  const { name, label, options, error, ...rest } = props;
  return (
    <div className="form-group">
      <select name={name} id={name} {...rest} className="options">
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
