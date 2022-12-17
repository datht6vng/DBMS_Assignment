import React, { Component } from "react";
import Form from "../common/form";
import "./ForgetPasswordForm.css";
import "./LoginForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const url = "http://localhost:4000";
class ForgetPasswordForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", code: "", password: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    code: Joi.string().required().min(6).label("Code"),
    password: Joi.string().required().min(5).label("Password"),
    confirmPassword: Joi.string().required().min(5).label("Password"),
  });
  schemaEmail = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
  });
  validateEmail = () => {
    var email = { email: this.state.data.email };
    const options = { abortEarly: false };
    const result = this.schemaEmail.validate(email, options);
    const { error } = result;
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSumbitEmail = (evt) => {
    evt.preventDefault();
    const errors = this.validateEmail();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmitEmail();
  };
  doSubmitEmail = async () => {
    let response = await Axios({
      method: "POST",
      data: {
        email: this.state.data.email,
      },
      withCredentials: true,
      url: url + "/api/get_reset_code", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ notification: response.data.message });
  };
  doSubmit = async () => {
    if (this.state.data.password != this.state.data.confirmPassword) {
      var error = {};
      error["confirmPassword"] = "Two passwords do not match!";
      this.setState({ errors: error });
      return;
    }
    let response = await Axios({
      method: "POST",
      data: {
        email: this.state.data.email,
        code: this.state.data.code,
        password: this.state.data.password,
      },
      withCredentials: true,
      url: url + "/api/check_reset_code", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      confirmAlert({
        title: "Notification!",
        message: "Reset password successfully, do you want to login now?",
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
      this.setState({ notification: response.data.message });
    } else this.setState({ notification: response.data.message });
  };
  render() {
    return (
      <div className="form-background">
        <div className="form-outer">
          <div className="forget-password-form-wrapper">
            <h1 className="forget-password-form-title">
              {" "}
              Forget Password Page{" "}
            </h1>{" "}
            <p className="notification">{this.state.notification}</p>
            <form
              className="forget-password-form-body"
              onSubmit={this.handleSumbitEmail}
            >
              {" "}
              {this.renderInput("email", "Email")}{" "}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
              <button disabled={false} className="btn-confirm">
                Get reset code
              </button>
            </form>{" "}
          </div>
          <div className="form-wrapper">
            <form className="form-body" onSubmit={this.handleSumbit}>
              {" "}
              {this.renderInput("code", "Code")}{" "}
              {this.renderInput("password", "Password", "password")}{" "}
              {this.renderInput(
                "confirmPassword",
                "Confirm Password",
                "password"
              )}{" "}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
              {this.renderButton("Confirm")}{" "}
            </form>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPasswordForm;
