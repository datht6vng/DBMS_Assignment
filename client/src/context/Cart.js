import { createContext, Component } from "react";
import _ from "lodash";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

export const CartContext = createContext();

const url = "http://localhost:4000";

class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      discount: 0,
      voucherCode: "",
    };
  }

  /*componentDidUpdate = () => {
    console.log("Current Cart Context: ", this.state.cartItems);
  };*/

  addItemToCart = (menuItem, itemQuantity = 1) => {
    let isItemExist = false;
    for (let cartItem of this.state.cartItems) {
      if (menuItem._id === cartItem._id) {
        isItemExist = true;
        break;
      }
    }

    if (!isItemExist) {
      let newCartItem = { ...menuItem, quantity: itemQuantity };
      let newCartItems = [...this.state.cartItems, newCartItem];
      this.setState({ cartItems: newCartItems });
    } else {
      const itemIndex = this.state.cartItems.findIndex(
        (cartItem) => cartItem._id === menuItem._id
      );
      let newCartItem = { ...this.state.cartItems[itemIndex] };
      newCartItem.quantity += itemQuantity;
      this.setState({
        cartItems: [
          ...this.state.cartItems.slice(0, itemIndex),
          newCartItem,
          ...this.state.cartItems.slice(itemIndex + 1),
        ],
      });
    }
  };

  reduceItemFromCart = (menuItem) => {
    let isItemExist = false;
    for (let cartItem of this.state.cartItems) {
      if (menuItem._id === cartItem._id) {
        isItemExist = true;
        break;
      }
    }
    if (!isItemExist) {
      console.log("Item not in cart yet");
      return;
    }

    const itemIndex = this.state.cartItems.findIndex(
      (cartItem) => cartItem._id === menuItem._id
    );
    let newCartItem = { ...this.state.cartItems[itemIndex] };
    newCartItem.quantity -= 1;
    if (newCartItem.quantity !== 0) {
      this.setState({
        cartItems: [
          ...this.state.cartItems.slice(0, itemIndex),
          newCartItem,
          ...this.state.cartItems.slice(itemIndex + 1),
        ],
      });
    } else {
      this.removeItemFromCart(menuItem);
    }
  };

  removeItemFromCart = (menuItem) => {
    const itemIndex = this.state.cartItems.findIndex(
      (cartItem) => cartItem._id === menuItem._id
    );
    this.setState({
      cartItems: [
        ...this.state.cartItems.slice(0, itemIndex),
        ...this.state.cartItems.slice(itemIndex + 1),
      ],
    });
  };

  getTotal = () => {
    var total = 0;
    for (let foodItem of this.state.cartItems) {
      total = foodItem.pricePU * foodItem.quantity + total;
    }
    return total;
  };

  applyVoucher = (response) => {
    if (response.data.voucherCode != this.state.voucherCode)
      this.setState({
        discount: response.data.discount,
        voucherCode: response.data.voucherCode,
      });
  };
  removeVoucher = () => {
    if (!this.state.voucherCode) return false;
    this.setState({
      discount: 0,
      voucherCode: "",
    });
    return true;
  };
  getFinal = () => {
    return this.getTotal() * (1 - this.state.discount / 100);
  };
  submitCart = () => {
    console.log(this.state.cartItems);
  };

  render = () => {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addItemToCart: this.addItemToCart,
          reduceItemFromCart: this.reduceItemFromCart,
          removeItemFromCart: this.removeItemFromCart,
          totalCost: this.getTotal(),
          applyVoucher: this.applyVoucher,
          discount: this.state.discount,
          voucherCode: this.state.voucherCode,
          finalCost: this.getFinal(),
          removeVoucher: this.removeVoucher,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  };
}

export default CartProvider;
