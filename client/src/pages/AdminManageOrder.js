import React, { Component } from "react";
import { UserContext } from "../context/User";
import ManageOrderFrame from "../components/ManageOrderFrame";
import AdminManageOrderFrame from "../components/AdminManageOrderFrame";
import "./AdminManageOrder.css";

class AdminManageOrder extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ currentLoginUser }) => (
          <AdminManageOrderFrame
            currentLoginUser={currentLoginUser}
            menuItems={this.props.menuItems}
            history={this.props.history} />
        )}
      </UserContext.Consumer>
    );
  }
}

export default AdminManageOrder;
