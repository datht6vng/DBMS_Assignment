import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import MenuDetail from "./pages/MenuDetail";
import AccountInfo from "./pages/AccountInfo";
import Order from "./pages/Order";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Payment from "./pages/Payment";
import UserProvider, { UserContext } from "./context/User";
import CartProvider from "./context/Cart";
import "./icons/fontawesome";
import ForgetPassword from "./pages/ForgerPassword";
import ChangePassword from "./pages/ChangePassword";
import ChangeInformation from "./pages/ChangeInformation";
import Introduction from "./pages/Introduction";
import Contact from "./pages/Contact.js";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import Axios from "axios";
import ManageOrder from "./pages/ManageOrder";
import ManageReservation from "./pages/ManageReservation";
import ManageReservationAd from "./pages/ManageReservationAd";
import AdminManageOrder from "./pages/AdminManageOrder";
import VerifyEmail from "./pages/VerifyEmail";

import AdminCenter from "./pages/AdminCenter";
import AdminMenu from "./pages/AdminMenu";

const url = "http://localhost:4000";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { menuItems: [] };
  }

  handleReservation = (message) => {
    console.log(message);
  };
  componentDidMount = async () => {
    this.updateAllFoods();
  };
  updateAllFoods = async () => {
    let response = await Axios({
      method: "GET",
      data: {},
      withCredentials: true,
      url: url + "/api/get_all_foods", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success) {
      this.setState({ menuItems: response.data.menuItems });
      // filter
    }
  };
  render = () => {
    return (
      <CartProvider>
        <UserContext.Consumer>
          {({ currentLoginUser, logoutUser }) => {
            return (
              <div>
                <Navbar
                  cookies={this.props.cookies}
                  currentLoginUser={currentLoginUser}
                  logoutUser={logoutUser}
                  history={this.props.history}
                />

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                  <Route
                    exact
                    path="/menu/:_id"
                    render={(props) => {
                      return (
                        <MenuDetail
                          cookies={this.props.cookies}
                          updateAllFoods={this.updateAllFoods}
                          {...props}
                          menuItems={this.state.menuItems}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/menu"
                    render={(props) => {
                      return (
                        <Menu
                          cookies={this.props.cookies}
                          items={this.state.menuItems}
                          {...props}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/admin/menu"
                    render={(props) => {
                      if (
                        this.props.cookies.get("user") &&
                        this.props.cookies.get("admin")
                      ) {
                        return (
                          <AdminMenu
                            cookies={this.props.cookies}
                            updateAllFoods={this.updateAllFoods}
                            {...props}
                            items={this.state.menuItems}
                          />
                        );
                      } else {
                        return <Redirect to="/menu" />;
                      }
                    }}
                  />
                  <Route
                    exact
                    path="/account"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <AccountInfo {...props} />;
                      return <Redirect to="/login" />;
                    }}
                  />
                  <Route
                    exact
                    path="/login"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <Redirect to="/menu" />;
                      return <Login {...props} loginUser={this.loginUser} />;
                    }}
                  />
                  <Route
                    exact
                    path="/register"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <Redirect to="/menu" />;
                      return <Register {...props} />;
                    }}
                  />
                  <Route
                    exact
                    path="/order"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <Order {...props} />;
                      return <Redirect to="/login" />;
                    }}
                  />
                  <Route
                    exact
                    path="/payment"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <Payment {...props} />;
                      return <Redirect to="/login" />;
                    }}
                  />
                  <Route
                    exact
                    path="/reservation"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return (
                          <Reservation
                            {...props}
                            onReservation={this.handleReservation}
                          />
                        );
                      return <Redirect to="/login" />;
                    }}
                  />
                  <Route
                    exact
                    path="/forget_password"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <Redirect to="/menu" />;
                      return <ForgetPassword {...props} />;
                    }}
                  />
                  <Route
                    exact
                    path="/change_password"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <ChangePassword {...props} />;
                      return <Redirect to="/login" />;
                    }}
                  />
                  <Route
                    exact
                    path="/change_information"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <ChangeInformation {...props} />;
                      return <Redirect to="/login" />;
                    }}
                  />
                  <Route
                    exact
                    path="/introduction"
                    render={(props) => {
                      return <Introduction {...props} />;
                    }}
                  />
                  <Route
                    exact
                    path="/contact"
                    render={(props) => {
                      return <Contact {...props} />;
                    }}
                  />
                  <Route
                    exact
                    path="/manage_order"
                    render={(props) => {
                      return (
                        <ManageOrder
                          {...props}
                          menuItems={this.state.menuItems}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/admin/manage_order"
                    render={(props) => {
                      if (
                        this.props.cookies.get("user") &&
                        this.props.cookies.get("admin")
                      ) {
                        return (
                          <AdminManageOrder
                            cookies={this.props.cookies}
                            {...props}
                            menuItems={this.state.menuItems}
                          />
                        );
                      } else {
                        return <Redirect to="/menu" />;
                      }
                    }}
                  />
                  <Route
                    exact
                    path="/verify_email"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <VerifyEmail {...props} />;
                      return <Redirect to="/login" />;
                    }}
                  />
                  <Route
                    exact
                    path="/manage_reservation"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <ManageReservation {...props} />;
                      return <Redirect to="/menu" />;
                    }}
                  />
                  <Route
                    exact
                    path="/admin/manage_reservation_ad"
                    render={(props) => {
                      if (this.props.cookies.get("user"))
                        return <ManageReservationAd {...props} />;
                      return <Redirect to="/menu" />;
                    }}
                  />
                  <Route
                    exact
                    path="/admin"
                    render={(props) => {
                      if (this.props.cookies.get("admin"))
                        return <AdminCenter {...props} />;
                      return <Redirect to="/menu" />;
                    }}
                  />
                  <Redirect to="/menu" /> {/*Otherwise redirect to menu*/}
                </Switch>
                <Footer />
              </div>
            );
          }}
        </UserContext.Consumer>
      </CartProvider>
    );
  };
}

export default withCookies(App);
