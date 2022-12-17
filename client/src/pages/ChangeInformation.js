import React, { Component } from "react";
import ChangeInformationForm from "../components/ChangeInformationForm";
import { UserContext } from "../context/User";
class ChangeInformation extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <UserContext.Consumer>
        {({ currentLoginUser, updateUserContext }) => {
          return (
            <ChangeInformationForm
              history={this.props.history}
              user={currentLoginUser}
              updateUserContext={updateUserContext}
            />
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default ChangeInformation;
