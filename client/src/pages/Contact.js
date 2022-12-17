import React, { Component } from "react";
import { UserContext } from "../context/User";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
class Contact extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <main>
        <div className="introduction-background">
          <div className="title">
            <h2> Contact </h2> <div className="underline"> </div>{" "}
          </div>{" "}
          <div className="contact-wrapper">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.65843061471834!3d10.773374292323565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1638052039047!5m2!1svi!2s"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="contact-information">
              <ul>
                {" "}
                <h3>Our Contact Information</h3>
                <li>
                  <div className="contact-information-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div ClassName="contact-information-content">
                    Phone: 12345678
                  </div>
                </li>
                <li>
                  <div className="contact-information-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div ClassName="contact-information-content">
                    Address: Ho Chi Minh City, Viet Nam
                  </div>
                </li>
                <li>
                  <div className="contact-information-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div ClassName="contact-information-content">
                    Timing: Everyday from 10 AM - 11 PM
                  </div>
                </li>
                <li>
                  <div className="contact-information-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div ClassName="contact-information-content">
                    Email: dat.huynh11082001@hcmut.edu.vn
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
      </main>
    );
  }
}

export default Contact;
