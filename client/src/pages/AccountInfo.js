import React, { Component } from "react";
import { UserContext } from "../context/User";
import "./AccountInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../icons/fontawesome";
import {
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
class AccountInfo extends React.Component {
  handleChangePasswordButton = () => {
    this.props.history.push("/change_password");
  };
  handleChangeInformationButton = () => {
    this.props.history.push("/change_information");
  };
  handleManageOrderButton = () => {
    this.props.history.push("/manage_order");
  };
  handleVerifyEmailButton = () => {
    this.props.history.push("/verify_email");
  };
  handleManageReservationButton = () => {
    this.props.history.push("/manage_reservation");
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <UserContext.Consumer>
        {({ currentLoginUser }) => {
          return (
            currentLoginUser.username !== "" && (
              <div className="account-background">
                <div className="account-info-wrapper">
                  <ul>
                    <li>
                      <h1>Your information</h1>
                    </li>
                    <li>
                      <div className="information-icon">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className="information-content">
                        Name: {currentLoginUser.username}
                      </div>
                    </li>
                    <li>
                      <div className="information-icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                      <div className="information-content">
                        Email: {currentLoginUser.email}
                      </div>
                    </li>
                    <li>
                      <div className="information-icon">
                        <FontAwesomeIcon icon={faPhone} />
                      </div>
                      <div className="information-content">
                        Phone number: {currentLoginUser.phone}
                      </div>
                    </li>
                    <li>
                      <div className="information-icon">
                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                      </div>
                      <div className="information-content">
                        Address: {currentLoginUser.address}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="change-button-wrapper">
                  {!currentLoginUser.verifyEmail && (
                    <button
                      className="post-button-ATC"
                      onClick={this.handleVerifyEmailButton}
                    >
                      Verify Your Email
                    </button>
                  )}
                  <button
                    className="post-button-ATC"
                    onClick={this.handleChangePasswordButton}
                  >
                    Change Password
                  </button>
                  <button
                    className="post-button-ATC"
                    onClick={this.handleChangeInformationButton}
                  >
                    Change Infomation
                  </button>
                  <button
                    className="post-button-ATC"
                    onClick={this.handleManageOrderButton}
                  >
                    Manage Order
                  </button>
                  <button
                    className="post-button-ATC"
                    onClick={this.handleManageReservationButton}
                  >
                    Manage Reservation
                  </button>
                </div>
              </div>
            )
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default AccountInfo;
