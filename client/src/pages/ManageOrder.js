import React, { Component } from "react";
import { UserContext } from "../context/User";
import ManageOrderFrame from "../components/ManageOrderFrame";

class ManageOrder extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ currentLoginUser }) => (
          <ManageOrderFrame
            currentLoginUser={currentLoginUser}
            menuItems={this.props.menuItems}
            history={this.props.history}
          />
        )}
      </UserContext.Consumer>
    );
  }
}

export default ManageOrder;
