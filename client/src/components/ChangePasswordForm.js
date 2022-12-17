import React, { Component } from "react";
import Form from "../common/form";
import "./LoginForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date
const url = "http://localhost:4000";
class ChangePasswordForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { oldPassword: "", newPassword: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    oldPassword: Joi.string().required().min(5).label("Password"),
    newPassword: Joi.string().required().min(5).label("Password"),
    confirmNewPassword: Joi.string().required().min(5).label("Password"),
  });

  doSubmit = async () => {
    if (this.state.data.newPassword != this.state.data.confirmNewPassword) {
      var error = {};
      error["confirmNewPassword"] = "Two passwords do not match!";
      this.setState({ errors: error });
      return;
    }
    let response = await Axios({
      method: "POST",
      data: {
        oldPassword: this.state.data.oldPassword,
        newPassword: this.state.data.newPassword,
      },
      withCredentials: true,
      url: url + "/api/change_password", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      confirmAlert({
        title: "Notification!",
        message: "Change password successfully, please login again!",

        buttons: [
          {
            label: "OK",
          },
        ],
      });
      this.props.logoutUser();
    } else this.setState({ notification: response.data.message });
  };
  render() {
    return (
      <div className="form-background-2">
        <div className="form-outer">
          <div className="form-wrapper">
            <h1 className="form-title"> Change Password Page </h1>
            <p className="notification">{this.state.notification}</p>
            <form className="form-body" onSubmit={this.handleSumbit}>
              {" "}
              {this.renderInput("oldPassword", "Old Password", "password")}{" "}
              {this.renderInput("newPassword", "New Password", "password")}{" "}
              {this.renderInput(
                "confirmNewPassword",
                "Confirm New Password",
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

export default ChangePasswordForm;
