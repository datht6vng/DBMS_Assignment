import React, { Component } from "react";
import ForgetPasswordForm from "../components/ForgetPasswordForm";

class ForgetPassword extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return <ForgetPasswordForm history={this.props.history} />;
  }
}

export default ForgetPassword;
