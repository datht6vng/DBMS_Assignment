import React, { Component } from "react";
import { UserContext } from "../context/User";
import ManageReservationFrame from "../components/ManageReservationFrame";

class ManageReservation extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ currentLoginUser }) => (
          <ManageReservationFrame
            currentLoginUser={currentLoginUser}
            menuItems={this.props.menuItems}
            history={this.props.history}
          />
        )}
      </UserContext.Consumer>
    );
  }
}

export default ManageReservation;
