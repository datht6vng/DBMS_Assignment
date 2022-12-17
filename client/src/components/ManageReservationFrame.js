import React, { Component } from "react";
import Axios from "axios";
import "./ManageOrderFrame.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const url = "http://localhost:4000";

class ManageReservationFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reservations: [] };
  }
  componentDidMount = async () => {
    this.updateUserReservations();
  };
  updateUserReservations = async () => {
    var response = await Axios({
      method: "GET",
      withCredentials: true,
      url: url + "/api/get_user_reservations", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ reservations: response.data.reservations });
    console.log(this.state);
  };
  showConfirmDialog = (index) => {
    return confirmAlert({
      title: "Warning!",
      message: "Are you sure to delete this reservation?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => await this.deleteReservation(index),
        },
        {
          label: "No",
        },
      ],
    });
  };
  deleteReservation = async (index) => {
    var response = await Axios({
      method: "POST",
      data: {
        reservationID: this.state.reservations[index]._id,
      },
      withCredentials: true,
      url: url + "/api/delete_user_reservation", // Should set to .ENV or DEFINE CONST
    });
    await this.updateUserReservations();
  };

  render() {
    return (
      <div className="manage-order-background">
        <div className="manage-order-title">
          Manage Your Reservations
          <div className="underline"> </div>
        </div>

        {this.state.reservations.length ? (
          <div className="orders-list">
            <div className="orders-list-header">
              <div className="delete-order-button">Action</div>
              <div className="order-id">Reservation</div>
              <div className="order-cost">Date</div>
              <div className="order-status">Time</div>
            </div>
            {this.state.reservations.map((reservation, index) => (
              <div className="order-frame">
                <div className="delete-order-button">
                  <button
                    className="delete-order-button-active"
                    onClick={() => this.showConfirmDialog(index)}
                  >
                    Cancel
                  </button>
                  <Popup
                    modal
                    className="manage-order-popup"
                    trigger={
                      <button className="delete-order-button-active">
                        {" "}
                        Detail
                      </button>
                    }
                  >
                    {(close) => (
                      <div>
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <h3 className="popup-header">Reservation Detail</h3>
                        <div className="popup-content-wrapper">
                          <div className="popup-content-information-wrapper">
                            <h4 className="popup-content-header">
                              Information
                            </h4>
                            <div className="popup-content-information">
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Reservation ID
                                </div>
                                <div className="popup-content-information-content">
                                  {reservation._id}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  User Email
                                </div>
                                <div className="popup-content-information-content">
                                  {reservation.email}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Date
                                </div>
                                <div className="popup-content-information-content">
                                  {reservation.date}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Time
                                </div>
                                <div className="popup-content-information-content">
                                  {reservation.time}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Message
                                </div>
                                <div className="popup-content-information-content">
                                  {reservation.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className="popup-order-close-button"
                          onClick={close}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </Popup>
                </div>
                <div className="order-id">{index + 1}</div>
                <div className="order-cost">{reservation.date}</div>
                <div className="order-status">{reservation.time}</div>
              </div>
            ))}
            <button
              className="back-to-menu-button"
              onClick={() => {
                this.props.history.push("/menu");
              }}
            >
              Back To Menu
            </button>
          </div>
        ) : (
          <div className="alert-no-order">You do not have any reservation!</div>
        )}
      </div>
    );
  }
}
export default ManageReservationFrame;
