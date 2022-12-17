import React, { Component } from "react";
import VerifyEmailForm from "../components/VerifyEmailForm";
import { UserContext } from "../context/User";

class VerifyEmail extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <UserContext.Consumer>
        {({ currentLoginUser, updateUserContext }) => {
          return (
            <VerifyEmailForm
              history={this.props.history}
              updateUserContext={updateUserContext}
            />
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default VerifyEmail;
