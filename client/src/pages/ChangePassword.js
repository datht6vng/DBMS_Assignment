import React, { Component } from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { UserContext } from "../context/User";
class ChangePassword extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <UserContext.Consumer>
        {({ logoutUser }) => {
          return (
            <ChangePasswordForm
              history={this.props.history}
              logoutUser={logoutUser}
            />
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default ChangePassword;
