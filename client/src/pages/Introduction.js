import React, { Component } from "react";
import { UserContext } from "../context/User";
import "./Introduction.css";

class Introduction extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <main>
        <div className="introduction-background">
          <div className="title">
            <h2> Introduction </h2> <div className="underline"> </div>{" "}
          </div>{" "}
          <div className="text-wrapper">
            A restaurant, or, more informally, an eatery, is a business that
            prepares and serves food and drinks to customers. Meals are
            generally served and eaten on the premises, but many restaurants
            also offer take-out and food delivery services. Restaurants vary
            greatly in appearance and offerings, including a wide variety of
            cuisines and service models ranging from inexpensive fast food
            restaurants and cafeterias, to mid-priced family restaurants, to
            high-priced luxury establishments.
          </div>
        </div>{" "}
      </main>
    );
  }
}

export default Introduction;
