import React, { Component } from "react";
import { CartContext } from "../context/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Order.css";
import "../icons/fontawesome";
import VoucherForm from "../components/VoucherForm";

class OrderDish extends React.Component {
  render() {
    const { cartItems, addItemToCart, reduceItemFromCart } = this.props;

    return (
      <div>
        {cartItems.map((dish, index) => {
          return (
            <div key={dish.id} className="dish_display_box">
              <div className="dish_id">
                <p>{index + 1}</p>
              </div>
              <div className="dish_image_display">
                <img className="dish_image" src={dish.imgUrl} />
              </div>
              <div className="dish_name">
                <p>{dish.name}</p>
              </div>
              <div className="dish_btn">
                <FontAwesomeIcon
                  icon="plus-circle"
                  onClick={() => addItemToCart(dish)}
                />
              </div>
              <div className="dish_quanity">
                <p>{dish.quantity}</p>
              </div>
              <div className="dish_btn">
                <FontAwesomeIcon
                  icon="minus-circle"
                  onClick={() => reduceItemFromCart(dish)}
                />
              </div>
              <div className="dish_price">
                <p>{dish.pricePU}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

class OrderMain extends React.Component {
  render() {
    const { cartItems } = this.props;

    return (
      <CartContext.Consumer>
        {({
          cartItems,
          addItemToCart,
          reduceItemFromCart,
          totalCost,
          applyVoucher,
          discount,
          finalCost,
          removeVoucher,
        }) => {
          if (totalCost === 0) {
            return (
              <h1 className="alert-message post-name">
                Please make your order !
              </h1>
            );
          } else {
            return (
              totalCost !== 0 && (
                <div className="order">
                  <h1 className="form-title"> Payment Info Page </h1>
                  <div className="order_main">
                    <div className="order_header">
                      <div className="dish_id">Food</div>
                      <div className="dish_image_display"></div>
                      <div className="dish_name">Food Name</div>
                      <div className="dish_btn"></div>
                      <div className="dish_quanity">Quantities</div>
                      <div className="dish_btn"></div>
                      <div className="dish_price">Price Per Unit</div>
                    </div>
                    <OrderDish
                      addItemToCart={addItemToCart}
                      reduceItemFromCart={reduceItemFromCart}
                      cartItems={cartItems}
                    />
                    <div className="order_header">
                      <div className="dish_id"></div>
                      <div className="dish_image_display"></div>
                      <div className="dish_name"></div>
                      <div className="dish_btn"></div>
                      <div className="dish_quanity">Totals Cost</div>
                      <div className="dish_btn"></div>
                      <div className="dish_price">{totalCost.toFixed(2)} $</div>
                    </div>

                    <div className="order_header">
                      <div className="dish_id"></div>
                      <div className="dish_image_display"></div>
                      <div className="dish_name"></div>
                      <div className="dish_btn"></div>
                      <div className="dish_quanity">Discount</div>
                      <div className="dish_btn"></div>
                      <div className="dish_price">- {discount} %</div>
                    </div>

                    <div className="order_header">
                      <div className="dish_id"></div>
                      <div className="dish_image_display"></div>
                      <div className="dish_name"></div>
                      <div className="dish_btn"></div>
                      <div className="dish_quanity">Final Cost</div>
                      <div className="dish_btn"></div>
                      <div className="dish_price">{finalCost.toFixed(2)} $</div>
                    </div>

                    <VoucherForm
                      applyVoucher={applyVoucher}
                      removeVoucher={removeVoucher}
                    />
                    <div className="payment">
                      <button
                        className="confirm-btn"
                        onClick={() => {
                          this.props.history.push("/payment");
                        }}
                      >
                        Finish Payment
                      </button>
                    </div>
                  </div>
                </div>
              )
            );
          }
        }}
      </CartContext.Consumer>
    );
  }
}

class Order extends React.Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <CartContext.Consumer>
        {({ cartItems, addItemToCart, reduceItemFromCart, applyVoucher }) => {
          return (
            <div>
              <OrderMain history={this.props.history} cartItems={cartItems} />
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Order;
