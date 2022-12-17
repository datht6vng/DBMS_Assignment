import React, { Component } from "react";
import Form from "../common/form";
import "./RegisterForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date
const url = "http://localhost:4000";
class ChangeInformationForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: this.props.user.username,
        phone: this.props.user.phone,
        address: this.props.user.address,
      },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
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
    let response = await Axios({
      method: "POST",
      data: {
        newUsername: this.state.data.username,
        newPhone: this.state.data.phone,
        newAddress: this.state.data.address,
      },
      withCredentials: true,
      url: url + "/api/change_information", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      await this.props.updateUserContext();
      confirmAlert({
        title: "Notification!",
        message: "Change account information successfully!",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
      this.props.history.replace("/account");
    } else this.setState({ notification: response.data.message });
  };

  render() {
    const { onUserRegister } = this.props;

    return (
      <div className="form-background-2">
        <div className="form-outer">
          <div className="form-wrapper">
            <h1 className="form-title"> Change Information Page </h1>{" "}
            <p className="notification">{this.state.notification}</p>
            <form className="form-body" onSubmit={this.handleSumbit}>
              {" "}
              {this.renderInput("username", "Name")}{" "}
              {this.renderInput("phone", "Phone")}{" "}
              {this.renderInput("address", "Address")}{" "}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
              {this.renderButton("Confirm")}{" "}
            </form>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default ChangeInformationForm;
