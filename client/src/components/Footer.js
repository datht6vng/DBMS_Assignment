import React, { Component } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
class Footer extends React.Component {
  render() {
    return (
      <div className="footer-wrapper">
        <div className="footer-item">
          <h1>Introduction</h1>
          <p>Nhà hàng super siêu cấp số 1 vũ trụ</p>
        </div>
        <div className="footer-item">
          <h1>Contact</h1>
          <ul>
            <li>
              <div className="footer-icon">
                <FontAwesomeIcon icon={faPhoneAlt} />
              </div>
              <div className="footer-information">Call: 123456789</div>
            </li>
            <li>
              <div className="footer-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="footer-information">
                Timing: Everyday from 10am - 11pm
              </div>
            </li>
            <li>
              <div className="footer-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="footer-information">
                Address: Ho Chi Minh City, Viet Nam{" "}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
