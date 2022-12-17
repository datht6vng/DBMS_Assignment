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
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import RenderStat from "../components/stat";

class AdminCenter extends React.Component {
  handleEditMenuButton = () => {
    this.props.history.push("/admin/menu");
  };
  handleManageAllReservationButton = () => {
    this.props.history.push("/admin/manage_reservation_ad");
  };
  handleManageAllOrderButton = () => {
    this.props.history.push("/admin/manage_order");
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
                      <h1>Admininstration Center</h1>
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
                        <FontAwesomeIcon icon={faEdit} />
                      </div>
                      <div className="information-content">
                        Last Edit: 3/12/2021
                      </div>
                    </li>
                  </ul>
                </div>
                <RenderStat />
                <div className="change-button-wrapper">
                  <button
                    className="post-button-ATC"
                    onClick={this.handleEditMenuButton}
                  >
                    Manage Restaurant Menu
                  </button>
                  <button
                    className="post-button-ATC"
                    onClick={this.handleManageAllReservationButton}
                  >
                    Manage All Reservations
                  </button>
                  <button
                    className="post-button-ATC"
                    onClick={this.handleManageAllOrderButton}
                  >
                    Manage All Orders
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

export default AdminCenter;
