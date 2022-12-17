import React, { Component } from "react";
import Form from "../common/form";
import "./ForgetPasswordForm.css";
import "./FeedbackForm.css";
import "./LoginForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const url = "http://localhost:4000";
class CommentForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { feedback: "", foodID: this.props.foodID, star: 0 },
      errors: {},
      notification: "",
    };
  }
  componentDidMount = async () => {
    var response = await Axios({
      method: "POST",
      data: {
        foodID: this.state.data.foodID,
        someFUcking: 123,
      },
      withCredentials: true,
      url: url + "/api/get_user_food_star", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      var data = this.state.data;
      data.star = response.data.star;
      this.setState({ data: data });
    }
  };
  handleClick = async (evt) => {
    evt.preventDefault();
    if (!this.state.data.feedback && !this.state.data.star) return;
    var response = await Axios({
      method: "POST",
      withCredentials: true,
      data: {
        foodID: this.state.data.foodID,
        feedback: this.state.data.feedback,
        star: this.state.data.star,
      },
      url: url + "/api/feedback", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ notification: response.data.message });
    console.log(response);
    this.props.updateAllFoods();
  };
  setStar = (star) => {
    var data = this.state.data;
    data.star = star;
    this.setState({ data: data });
  };
  render() {
    return (
      <div>
        <div className="forget-password-form-wrapper">
          <h1 className="form-title"> Send us your feedback </h1>
          <p className="notification">{this.state.notification}</p>
          <ul class="ratings">
            <li
              className={`star ${this.state.data.star == 5 ? "selected" : ""}`}
              onClick={() => this.setStar(5)}
            ></li>
            <li
              className={`star ${this.state.data.star == 4 ? "selected" : ""}`}
              onClick={() => this.setStar(4)}
            ></li>{" "}
            <li
              className={`star ${this.state.data.star == 3 ? "selected" : ""}`}
              onClick={() => this.setStar(3)}
            ></li>{" "}
            <li
              className={`star ${this.state.data.star == 2 ? "selected" : ""}`}
              onClick={() => this.setStar(2)}
            ></li>{" "}
            <li
              className={`star ${this.state.data.star == 1 ? "selected" : ""}`}
              onClick={() => this.setStar(1)}
            ></li>
          </ul>
          <form
            className="forget-password-form-body"
            onSubmit={this.handleClick}
          >
            {this.renderInputNoChangeValidate(
              "feedback",
              "Input your feedback here"
            )}{" "}
            {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
            <button disabled={false} className="btn-confirm">
              Send Feedback
            </button>
          </form>{" "}
        </div>
      </div>
    );
  }
}

export default CommentForm;
