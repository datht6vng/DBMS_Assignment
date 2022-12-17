import React, { Component } from "react";
import Form from "../common/form";
import "./PaymentForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const url = "http://localhost:4000";
class PaymentForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        paymentType: "",
        takeAwayOrEatIn: "",
        address: "",
        bank: "",
        creditCardNumber: "",
      },
      errors: {},
      notification: "",
      paymentType: [
        {
          label: "Online Payment",
          value: "Online",
        },
        {
          label: "Direct Payment",
          value: "Direct",
        },
      ],
      takeAwayOrEatIn: [
        {
          label: "Take Away",
          value: "Take Away",
        },
        {
          label: "Eat In",
          value: "Eat In",
        },
        {
          label: "Delivery",
          value: "Delivery",
        },
      ],
      banks: [
        {
          label: "OCB",
          value: "OCB",
        },
        {
          label: "ACB",
          value: "ACB",
        },
        {
          label: "Sacombank",
          value: "Sacombank",
        },
        {
          label: "Argibank",
          value: "Argibank",
        },
      ],
    };
  }

  schema = Joi.object({
    paymentType: Joi.string()
      .required()
      .label("Payment Type")
      .valid("Online", "Direct")
      .messages({
        "string.domain": "Please choose your payment type",
      }),
    takeAwayOrEatIn: Joi.string()
      .required()
      .label("Take Away or Eat In")
      .valid("Take Away", "Eat In", "Delivery")
      .messages({
        "string.domain": "Please choose take-away, delivery or eat-in",
      }),
    address: Joi.string().allow(null).allow("").label("Address"),
    bank: Joi.string().allow(null).allow("").label("Bank"),
    creditCardNumber: Joi.string()
      .regex(/^[0-9]{16}$/)
      .allow(null)
      .allow("")
      .label("Credit Card Number")
      .messages({
        "string.pattern.base": "Credit Card Number must be 16 digits",
      }),
  });

  doSubmit = async () => {
    const { takeAwayOrEatIn, paymentType, address } = this.state.data;
    if (takeAwayOrEatIn == "Delivery" && address == "") {
      this.setState({
        notification: "You must give delivery address for take away order",
      });
      return;
    }

    const formData = {
      paymentType: this.state.data.paymentType,
      takeAwayOrEatIn: this.state.data.takeAwayOrEatIn,
      address: this.state.data.address,
      bank: this.state.data.bank,
      creditCardNumber: this.state.data.creditCardNumber,
      cartItems: this.props.cartItems.map((cartItem) => {
        return { _id: cartItem._id, quantity: cartItem.quantity };
      }),
    };

    if (formData.paymentType == "Direct") {
      formData.bank = "";
      formData.creditCardNumber = "";
    } else {
      if (
        formData.bank == "" ||
        !/^[0-9]{16}$/.test(formData.creditCardNumber)
      ) {
        this.setState({
          notification:
            "Please choose your bank and provide your 16 digits credit card number of online payment",
        });
        return;
      }
    }
    console.log(formData.cartItems);
    var response = await Axios({
      method: "POST",
      withCredentials: true,
      data: {
        ...formData,
        voucherCode: this.props.voucherCode,
        totalCost: this.props.totalCost,
        finalCost: this.props.finalCost,
        time: Date(),
      },
      url: url + "/api/make_order", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      confirmAlert({
        title: "Notification!",
        message: "Make order successfully!",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
      this.props.history.replace("/menu");
    } else this.setState({ notification: response.data.message });
  };

  render() {
    return (
      <div className="form-background-4">
        <div className="form-outer-dark">
          <div className="form-wrapper">
            <h1 className="form-title-light"> Payment Info Page </h1>{" "}
            <p className="notification">{this.state.notification}</p>
            <form className="form-body" onSubmit={this.handleSumbit}>
              {this.renderSelect(
                "paymentType",
                "Payment Type",
                this.state.paymentType
              )}{" "}
              {this.renderSelect(
                "takeAwayOrEatIn",
                "Take Away, Delivery Or Eat In",
                this.state.takeAwayOrEatIn
              )}{" "}
              {this.state.data.takeAwayOrEatIn == "Delivery" &&
                this.renderInput("address", "Address")}{" "}
              {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
              {this.state.data.paymentType == "Online" &&
                this.renderSelect("bank", "Bank", this.state.banks)}
              {this.state.data.paymentType == "Online" &&
                this.renderInput("creditCardNumber", "Credit Card Number")}
              {this.renderButton("Finish Your Payment")}{" "}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentForm;
