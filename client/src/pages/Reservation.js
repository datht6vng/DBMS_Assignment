import React, { Component } from "react";
import ReservationForm from "../components/ReservationForm";

class Reservation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ReservationForm
          onReservation={this.props.onReservation}
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

export default Reservation;
