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
class ReservationForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { nop: "", date: "", time: "", message: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    nop: Joi.number().integer().min(1).max(50).label("Number of Persons"),
    date: Joi.date().required().label("Date"),
    time: Joi.string().required().label("Time"),
    message: Joi.string().required().label("Message"),
  });

  doSubmit = async () => {
    // Call the server
    // /this.props.onReservation(this.state);
    let response = await Axios({
      method: "POST",
      data: {
        numberOfPersons: this.state.data.nop,
        date: this.state.data.date,
        time: this.state.data.time,
        message: this.state.data.message,
      },
      withCredentials: true,
      url: url + "/api/reservation", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      confirmAlert({
        title: "Notification!",
        message: "Reservation successfully!",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
      this.props.history.push("/menu");
    } else this.setState({ notification: response.data.message });
  };

  render() {
    const { onUserRegister } = this.props;

    return (
      <div className="form-background-3">
        <div className="form-outer">
          <div className="form-wrapper">
            <h1 className="form-title-light">Make Your Reservation</h1>
            <p className="notification">{this.state.notification}</p>
            <form className="form-body" onSubmit={this.handleSumbit}>
              {this.renderInput("nop", "Number of persons")}
              {this.renderDate("date", "Date (DD/MM/YYYY)")}
              {this.renderTime("time", "Time (HH:MM:SS)")}
              {this.renderInput("message", "Message")}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}
              {this.renderButton("Register")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationForm;
