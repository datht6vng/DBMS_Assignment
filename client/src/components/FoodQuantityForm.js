import React, { Component } from "react";
import Form from "../common/form";
import "./ForgetPasswordForm.css";
import "./LoginForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";
import "./FoodQuantityForm.css";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const url = "http://localhost:4000";
class FoodQuantityForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { quantity: 1 },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    quantity: Joi.number().integer().min(1).label("Quantity"),
  });
  handleClick = async (evt) => {
    console.log(this.props.menuItem, this.state.data.quantity);
    this.props.addItemToCart(this.props.menuItem, this.state.data.quantity);
    this.props.history.push("/menu");
  };
  render() {
    return (
      <div>
        <div className="food-quantity-form-wrapper">
          <p className="food-quantity-form-title"> {this.props.food_name} </p>
          <p className="notification">{this.state.notification}</p>
          <form
            className="forget-password-form-body"
            onSubmit={this.handleClick}
          >
            {" "}
            {this.renderInput("quantity", "Quantity", "number")}{" "}
            {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
            <button disabled={false} className="popup-add-to-cart-button">
              Add to cart
            </button>
          </form>{" "}
        </div>
      </div>
    );
  }
}

export default FoodQuantityForm;
