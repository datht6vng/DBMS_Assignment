import React, { Component } from "react";
import Axios from "axios";
import "./ManageReservationFrame.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FilterDateForm from "./FilterDateForm";
import Reservation from "../pages/Reservation";

const url = "http://localhost:4000";

class ManageReservationFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reservations: [], fullReservations: [] };
  }
  componentDidMount = async () => {
    this.updateUserReservations();
  };

  updateUserReservations = async () => {
    var response = await Axios({
      method: "GET",
      withCredentials: true,
      url: url + "/api/admin/get_all_reservations", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ fullReservations: response.data.reservations });
    this.setState({ reservations: response.data.reservations });
  };

  filterUserReservation = (dateFormat) => {
    console.log("Filter Date", dateFormat.trim(" ").split("-"));
    let filterYear, filterMonth, filterDate;
    [filterYear, filterMonth, filterDate] = dateFormat.trim(" ").split("-");
    let filteredItemsList = [];
    for (let item of this.state.fullReservations) {
      let itemYear, itemMonth, itemDate;
      [itemYear, itemMonth, itemDate] = item.date.trim(" ").split("-");
      if (
        itemDate == filterDate &&
        itemMonth == filterMonth &&
        itemYear == filterYear
      ) {
        filteredItemsList.push({ ...item });
      }
    }

    this.setState({ reservations: filteredItemsList });
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
      <div className="manage-reservation-background">
        <div className="manage-reservation-title">
          Admin Manage Reservations
          <div className="underline"> </div>
        </div>

        <button
          className="back-to-menu-button"
          onClick={() => {
            this.props.history.push("/admin");
          }}
        >
          Back To Admininstrator Center
        </button>

        <FilterDateForm filterItemsList={this.filterUserReservation} />

        <button
          className="back-to-menu-button"
          onClick={async () => {
            await this.updateUserReservations();
          }}
        >
          Reload User Reservation
        </button>

        {this.state.reservations.length ? (
          <div className="reservations-list">
            <div className="reservations-list-header">
              <div className="delete-reservation-button">Action</div>
              <div className="reservation-id">Reservation</div>
              <div className="reservation-cost">Date</div>
              <div className="reservation-status">Time</div>
            </div>
            {this.state.reservations.map((reservation, index) => (
              <div className="reservation-frame">
                <div className="delete-reservation-button">
                  <button
                    className="delete-reservation-button-active"
                    onClick={() => this.showConfirmDialog(index)}
                  >
                    Cancel
                  </button>
                  <Popup
                    modal
                    className="manage-reservation-popup"
                    trigger={
                      <button className="delete-reservation-button-active">
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
                                  Number Of Persons
                                </div>
                                <div className="popup-content-information-content">
                                  {reservation.numberOfPersons}
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
                          className="popup-reservation-close-button"
                          onClick={close}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </Popup>
                </div>
                <div className="reservation-id">{index + 1}</div>
                <div className="reservation-cost">{reservation.date}</div>
                <div className="reservation-status">{reservation.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert-no-reservation">
            No Reservation Has Been Made By Any Customers!
          </div>
        )}
      </div>
    );
  }
}
export default ManageReservationFrame;
