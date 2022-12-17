import React, { Component } from "react";
import Axios from "axios";
import "./ManageOrderFrame.css";
import "./AdminManageOrderFrame.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import FilterDateForm from "./FilterDateForm";
const url = "http://localhost:4000";

class AdminManageOrderFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], fullOrders: [] };
  }

  componentDidMount = async () => {
    this.updateUserOrders();
  };

  updateUserOrders = async () => {
    var response = await Axios({
      method: "GET",
      withCredentials: true,
      url: url + "/api/admin/get_all_orders", // Should set to .ENV or DEFINE CONST
    });
    this.setState({ fullOrders: response.data.orders });
    this.setState({ orders: response.data.orders });
  };

  filterUserOrders = (dateFormat) => {
    console.log("Filter Date", dateFormat.trim(" ").split("-"));
    let filterYear, filterMonth, filterDate;
    [filterYear, filterMonth, filterDate] = dateFormat.trim(" ").split("-");
    console.log("Filter", filterYear, filterMonth, filterDate);
    let filteredItemsList = [];
    for (let item of this.state.fullOrders) {
      const time = new Date(item.time);
      console.log("time", time.getDate(), time.getMonth(), time.getFullYear());
      if (
        time.getDate() == filterDate &&
        time.getMonth() + 1 == filterMonth &&
        time.getFullYear() == filterYear
      ) {
        filteredItemsList.push({ ...item });
      }
    }

    this.setState({ orders: filteredItemsList });
  };

  showConfirmDialog = (order) => {
    return confirmAlert({
      title: "Confirm Order!",
      message: "Are you sure to confirm this order?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => await this.confirmOrder(order),
        },
        {
          label: "No",
        },
      ],
    });
  };

  showDenyDialog = (order) => {
    return confirmAlert({
      title: "Deny Order!",
      message: "Are you sure to deny this order?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => await this.denyOrder(order),
        },
        {
          label: "No",
        },
      ],
    });
  };

  confirmOrder = async (order) => {
    var response = await Axios({
      method: "POST",
      data: {
        orderID: order._id,
        status: "Confirm",
        reason: "",
      },
      withCredentials: true,
      url: url + "/api/admin/set_user_order", // Should set to .ENV or DEFINE CONST
    });
    await this.updateUserOrders();
  };

  denyOrder = async (order) => {
    var response = await Axios({
      method: "POST",
      data: {
        orderID: order._id,
        status: "Deny",
        reason: "",
      },
      withCredentials: true,
      url: url + "/api/admin/set_user_order", // Should set to .ENV or DEFINE CONST
    });
    await this.updateUserOrders();
  };

  renderCartItem = (cartItem, subIndex) => {
    var result = this.props.menuItems.find(
      (element) => cartItem._id == element._id
    );
    if (!result) return <div key={subIndex} />;
    return (
      <div key={result._id} className="popup-content-cart-item">
        <div className="cart-item-image">
          <img src={result.imgUrl}></img>
        </div>
        <div className="cart-item-name">{result.name}</div>
        <div className="cart-item-price">Price: {result.pricePU} $</div>
        <div className="cart-item-quantity">Quantity: {cartItem.quantity}</div>
      </div>
    );
  };
  render() {
    return (
      <div className="manage-order-background">
        <div className="manage-order-title">
          All Customer Orders
          <div className="underline"> </div>
        </div>

        <button
          className="back-to-menu-button"
          onClick={() => {
            this.props.history.push("/admin");
          }}
        >
          Back To Administration Center
        </button>

        <FilterDateForm filterItemsList={this.filterUserOrders} />

        <button
          className="back-to-menu-button"
          onClick={async () => {
            await this.updateUserOrders();
          }}
        >
          Reload User Orders
        </button>

        {this.state.orders.length ? (
          <div className="admin-orders-list">
            <div className="orders-list-header">
              <div className="admin-order-customer-email">Customer Email</div>
              <div className="admin-order-id">Order Id</div>
              <div className="admin-order-cost">Cost</div>
              <div className="admin-order-status">Status</div>
              <div className="admin-delete-order-button">Action</div>
            </div>
            {this.state.orders.map((order, index) => (
              <div key={index} className="order-frame">
                <div className="admin-order-customer-email">{order.email}</div>
                <div className="admin-order-id">
                  {order._id.length > 10
                    ? order._id.substr(0, 10) + "..."
                    : order._id}
                </div>
                <div className="admin-order-cost">
                  {order.finalCost.toFixed(2)} $
                </div>
                <div className="admin-order-status">{order.status}</div>
                <div className="admin-delete-order-button">
                  {order.status == "Waiting" ? (
                    <button
                      className="admin-confirm-order-button-active"
                      onClick={() => this.showConfirmDialog(order)}
                    >
                      Confirm
                    </button>
                  ) : (
                    <button className="admin-order-button-not-active">
                      Confirm
                    </button>
                  )}
                  {order.status == "Waiting" ? (
                    <button
                      className="admin-deny-order-button-active"
                      onClick={() => this.showDenyDialog(order)}
                    >
                      Deny
                    </button>
                  ) : (
                    <button className="admin-order-button-not-active">
                      Deny
                    </button>
                  )}
                  <Popup
                    modal
                    className="manage-order-popup"
                    trigger={
                      <button className="admin-detail-button-active">
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
                        <h3 className="popup-header">Order Detail</h3>
                        <div className="popup-content-wrapper">
                          <div className="popup-content-information-wrapper">
                            <h4 className="popup-content-header">
                              Information
                            </h4>
                            <div className="popup-content-information">
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Order ID
                                </div>
                                <div className="popup-content-information-content">
                                  {order._id}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  User Email
                                </div>
                                <div className="popup-content-information-content">
                                  {order.email}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Payment type
                                </div>
                                <div className="popup-content-information-content">
                                  {order.paymentType}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Eat type
                                </div>
                                <div className="popup-content-information-content">
                                  {order.takeAwayOrEatIn}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Order time
                                </div>
                                <div className="popup-content-information-content">
                                  {order.time}
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Total cost
                                </div>
                                <div className="popup-content-information-content">
                                  {order.totalCost.toFixed(2)} $
                                </div>
                              </div>
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Final cost
                                </div>
                                <div className="popup-content-information-content">
                                  {order.finalCost.toFixed(2)} $
                                </div>
                              </div>
                              {order.voucherCode && (
                                <div className="popup-content-information-content-wrapper">
                                  <div className="popup-content-information-content-header">
                                    Voucher
                                  </div>
                                  <div className="popup-content-information-content">
                                    {order.voucher}
                                  </div>
                                </div>
                              )}
                              {order.address && (
                                <div className="popup-content-information-content-wrapper">
                                  <div className="popup-content-information-content-header">
                                    Delivery Address
                                  </div>
                                  <div className="popup-content-information-content">
                                    {order.address}
                                  </div>
                                </div>
                              )}
                              {order.paymentType == "Online" && (
                                <div className="popup-content-information-content-wrapper">
                                  <div className="popup-content-information-content-header">
                                    Payment bank
                                  </div>
                                  <div className="popup-content-information-content">
                                    {order.bank}
                                  </div>
                                </div>
                              )}
                              {order.paymentType == "Online" && (
                                <div className="popup-content-information-content-wrapper">
                                  <div className="popup-content-information-content-header">
                                    Payment credit card
                                  </div>
                                  <div className="popup-content-information-content">
                                    {order.creditCardNumber}
                                  </div>
                                </div>
                              )}
                              <div className="popup-content-information-content-wrapper">
                                <div className="popup-content-information-content-header">
                                  Status
                                </div>
                                <div className="popup-content-information-content">
                                  {order.status}
                                </div>
                              </div>
                              {order.reason && (
                                <div className="popup-content-information-content-wrapper">
                                  <div className="popup-content-information-content-header">
                                    Reason
                                  </div>
                                  <div className="popup-content-information-content">
                                    {" "}
                                    {order.reason}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="popup-content-cart-wrapper">
                            <h4 className="popup-content-cart-header">Cart</h4>
                            <div className="popup-content-cart">
                              {order.cartItems.map((cartItem, subIndex) =>
                                this.renderCartItem(cartItem, subIndex)
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          className="popup-order-close-button"
                          onClick={close}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert-no-order">
            No Order Has Been Made By Any Customers!
          </div>
        )}
      </div>
    );
  }
}
export default AdminManageOrderFrame;
