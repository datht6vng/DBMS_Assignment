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
      data: { code: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    code: Joi.string().required().min(6).label("Code"),
  });

  doSubmit = async () => {
    let response = await Axios({
      method: "POST",
      data: {
        code: this.state.data.code,
      },
      withCredentials: true,
      url: url + "/api/check_verify_code", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      await this.props.updateUserContext();
      confirmAlert({
        title: "Notification!",
        message: "Verify email successfully!",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
      this.props.history.replace("/account");
    } else this.setState({ notification: response.data.message });
  };
  getCode = async () => {
    let response = await Axios({
      method: "GET",
      data: {},
      withCredentials: true,
      url: url + "/api/get_verify_code", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ notification: response.data.message });
  };
  render() {
    return (
      <div className="form-background-4">
        <div className="form-outer">
          <div className="form-wrapper">
            <h1 className="form-title">Verify Email Page</h1>{" "}
            <p className="notification">{this.state.notification}</p>
            <form
              className="forget-password-form-body"
              onSubmit={(evt) => {
                evt.preventDefault();
              }}
            >
              {" "}
              {this.renderInput("code", "Code")}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
              <button
                disabled={false}
                className="btn-confirm"
                onClick={() => {
                  this.getCode();
                }}
              >
                Get code
              </button>
            </form>{" "}
            <form className="form-body" onSubmit={this.handleSumbit}>
              {this.renderButton("Confirm")}{" "}
            </form>
            {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPasswordForm;
