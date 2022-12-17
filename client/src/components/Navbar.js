import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Reservation from "../pages/Reservation";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import icon from "../images/icon.png";

class Navbar extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  handleLogoutUser = async () => {
    const response = await this.props.logoutUser();
    this.props.history.replace("/login");
  };

  render() {
    const { currentLoginUser, logoutUser } = this.props;
    return (
      <div>
        <nav className="navbar py-3 navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img src={icon} alt="" height="40" /> Cuc Cu Restaurant
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {this.props.cookies.get("user") && (
                <li>
                  <Link className="nav-link" to="/order">
                    <i className="bi bi-cart3"></i>
                  </Link>
                </li>
              )}
              <li>
                <Link className="nav-link" to="/menu">
                  Menu
                </Link>
              </li>
              {this.props.cookies.get("user") && (
                <li>
                  <Link className="nav-link" to="/reservation">
                    Reservation
                  </Link>
                </li>
              )}
              <li>
                <Link className="nav-link" to="/introduction">
                  Introduction
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!this.props.cookies.get("user") && (
              <ul className="navbar-nav ml-auto">
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            )}{" "}
            {this.props.cookies.get("user") && (
              <ul className="navbar-nav ml-auto">
                {this.props.cookies.get("admin") ? (
                  <li>
                    <Link className="nav-link" to="/admin">
                      Administrator
                    </Link>
                  </li>
                ) : (
                  <li />
                )}
                <li>
                  <Link className="nav-link" to="/account">
                    {currentLoginUser.username}
                  </Link>
                </li>
                <li>
                  <div
                    className="nav-link log-out-nav-link"
                    onClick={this.handleLogoutUser}
                  >
                    Logout
                  </div>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(withCookies(Navbar));
