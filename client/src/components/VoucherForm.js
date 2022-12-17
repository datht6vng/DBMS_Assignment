import React, { Component } from "react";
import Form from "../common/form";
import "./ForgetPasswordForm.css";
import "./LoginForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";

const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const url = "http://localhost:4000";
class VoucherForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { voucherCode: "" },
      errors: {},
      notification: "",
    };
  }

  schema = Joi.object({
    voucherCode: Joi.string().label("Voucher"),
  });
  handleClick = async (evt) => {
    evt.preventDefault();
    let response = await Axios({
      method: "POST",
      data: {
        voucherCode: this.state.data.voucherCode,
      },
      withCredentials: true,
      url: url + "/api/apply_voucher", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ notification: response.data.message });
    console.log(response);
    if (response.data.success) this.props.applyVoucher(response);
  };
  removeVoucher = async () => {
    if (this.props.removeVoucher())
      this.setState({ notification: "Remove voucher successfully!" });
    else this.setState({ notification: "You have not applied any voucher!" });
  };
  render() {
    return (
      <div>
        <div className="forget-password-form-wrapper">
          <p className="notification">{this.state.notification}</p>
          <form
            className="forget-password-form-body"
            onSubmit={this.handleClick}
          >
            {" "}
            {this.renderInputNoChangeValidate(
              "voucherCode",
              "Voucher code"
            )}{" "}
            {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
            <button disabled={false} className="remove-voucher-button">
              Apply
            </button>
          </form>{" "}
          <button
            disabled={false}
            className="remove-voucher-button"
            onClick={this.removeVoucher}
          >
            Remove Voucher
          </button>
        </div>
      </div>
    );
  }
}

export default VoucherForm;
