import React, { Component } from "react";
import Form from "../common/form";
import "./RegisterForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

class RegisterForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", email: "", password: "", phone: "", address: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    confirmPassword: Joi.string().required().min(5).label("Password"),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .label("Phone Number")
      .messages({
        "string.pattern.base": "Phone number must be of 10 digits",
      }),
    address: Joi.string().required().label("Address"),
  });

  doSubmit = async () => {
    if (this.state.data.password != this.state.data.confirmPassword) {
      var error = {};
      error["confirmPassword"] = "Two passwords do not match!";
      this.setState({ errors: error });
      return;
    }
    const response = await this.props.onUserRegister(this.state);
    console.log("Register response", response);
    if (response.success) {
      confirmAlert({
        title: "Notification!",
        message: "Register successfully, do you want to login now?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => this.props.history.replace("/login"),
          },
          {
            label: "No",
            onClick: async () =>
              this.setState({ notification: response.message }),
          },
        ],
      });
      this.setState({ notification: response.message });
    } else {
      this.setState({ notification: response.message });
    }
  };

  render() {
    const { onUserRegister } = this.props;

    return (
      <div className="form-background">
        <div className="form-outer">
          <div className="form-wrapper">
            <h1 className="form-title"> Member Register Page </h1>{" "}
            <p className="notification">{this.state.notification}</p>
            <form className="form-body" onSubmit={this.handleSumbit}>
              {" "}
              {this.renderInput("email", "Email")}{" "}
              {this.renderInput("username", "Name")}{" "}
              {this.renderInput("password", "Password", "password")}{" "}
              {this.renderInput(
                "confirmPassword",
                "Confirm Password",
                "password"
              )}{" "}
              {this.renderInput("phone", "Phone")}{" "}
              {this.renderInput("address", "Address")}{" "}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
              {this.renderButton("Register")}{" "}
            </form>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
