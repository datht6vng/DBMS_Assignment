import React, { Component } from "react";
import Form from "../common/form";
import "./LoginForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";

const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", password: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  });

  doSubmit = async () => {
    const response = await this.props.onUserLogin(this.state);
    console.log("Login response", response);
    if (response.success) {
      this.props.history.replace("/menu");
    } else {
      this.setState({ notification: response.message });
    }
  };
  handleForgetPassword = () => {
    this.props.history.push("/forget_password");
  };
  render() {
    return (
      <div className="form-background">
        <div className="form-outer">
          <div className="form-wrapper">
            <h1 className="form-title"> Member Login Page </h1>
            <p className="notification">{this.state.notification}</p>
            <form className="form-body" onSubmit={this.handleSumbit}>
              {" "}
              {this.renderInput("email", "Email")}{" "}
              {this.renderInput("password", "Password", "password")}{" "}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
              {this.renderButton("Login")}{" "}
            </form>{" "}
            <div>
              <center>
                <button
                  disabled={false}
                  className="btn-confirm"
                  onClick={this.handleForgetPassword}
                >
                  Forget password{" "}
                </button>{" "}
              </center>{" "}
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
