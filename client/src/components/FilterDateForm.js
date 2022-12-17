import React, { Component } from "react";
import Form from "../common/form";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import "./RegisterForm.css";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date
const url = "http://localhost:4000";

class FilterDateForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { date: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    date: Joi.date().required().label("Date"),
  });

  doSubmit = () => {
    this.props.filterItemsList(this.state.data.date);
  };

  render() {
    const { onUserRegister, itemsList } = this.props;

    return (
      <div className="form-outer">
        <div className="form-wrapper">
          <h1 className="form-title">Search By Date</h1>
          <p className="notification">{this.state.notification}</p>
          <form className="form-body" onSubmit={this.handleSumbit}>
            {this.renderDateNoRestriction("date", "Date (DD/MM/YYYY)")}
            {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}
            {this.renderButton("Filter")}
          </form>
        </div>
      </div>
    );
  }
}

export default FilterDateForm;
