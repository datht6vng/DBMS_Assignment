import React, { Component } from "react";
import PaymentForm from "../components/PaymentForm";
import { CartContext } from "../context/Cart";

class Payment extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <CartContext.Consumer>
        {({ cartItems, voucherCode, finalCost, totalCost }) => {
          return (
            <div>
              <PaymentForm
                cartItems={cartItems}
                voucherCode={voucherCode}
                finalCost={finalCost}
                totalCost={totalCost}
                history={this.props.history}
              />
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Payment;
