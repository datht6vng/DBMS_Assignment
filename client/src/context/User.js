import { data } from "jquery";
import { createContext, Component } from "react";
import _ from "lodash";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

export const UserContext = createContext();

const emptyUser = {
  username: "",
  email: "",
  userId: "",
  phone: "",
  token: "",
  address: "",
};

const url = "http://localhost:4000";

class UserProvider extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentLoginUser: {
        username: "",
        email: "",
        userId: "",
        phone: "",
        token: "",
        address: "",
      },
    };
  }
  componentDidMount = async () => {
    this.updateUserContext();
  };
  updateUserContext = async () => {
    let response = await Axios({
      method: "GET",
      data: {},
      withCredentials: true,
      url: url + "/api/check_login", // Should set to .ENV or DEFINE CONST
    });
    if (response.data.success && !this.state.email) {
      this.setState({
        currentLoginUser: {
          email: response.data.message.email,
          password: response.data.message.password,
          username: response.data.message.username,
          address: response.data.message.address,
          phone: response.data.message.phone,
          role: response.data.message.role,
          verifyEmail: response.data.message.verifyEmail,
        },
      });
    }
  };
  /*componentDidUpdate = () => {
    console.log("Current global user variable: ", this.state.currentLoginUser);
  };*/

  registerUser = async ({ data }) => {
    // Call the server
    let response = await Axios({
      method: "POST",
      data: {
        email: data.email,
        password: data.password,
        username: data.username,
        address: data.address,
        phone: data.phone,
      },
      withCredentials: true,
      url: url + "/api/register", // Should set to .ENV or DEFINE CONST
    });
    console.log("Register axios response", response);
    console.log("Register axios complete");
    return { message: response.data.message, success: response.data.success };
  };

  /**
   * loginInfo : {data: {}, errors: {}}
   */
  loginUser = async ({ data }) => {
    console.log("Context login user function", data);

    // POST to server by axios call
    let response = await Axios({
      method: "POST",
      data: {
        email: data.email,
        password: data.password,
      },
      withCredentials: true,
      url: url + "/api/login", // Should set to .ENV or DEFINE CONST
    });

    console.log(response);

    if (response.data.success) {
      const { data, status } = response;
      const user = {
        username: data.user.username,
        email: data.user.email,
        userId: data.user._id,
        phone: data.user.phone,
        token: data.user.password,
        address: data.user.address,
        role: data.user.role,
        verifyEmail: data.user.verifyEmail
      };
      this.setState({ currentLoginUser: user });
      this.props.cookies.set("user", data.user.email, { path: "/" }); // set a cookie
      if (data.user.role == "Admin")
        this.props.cookies.set("admin", data.user.email, { path: "/" });
    }
    return { message: response.data.message, success: response.data.success };
  };

  logoutUser = async () => {
    this.setState({ currentLoginUser: emptyUser });
    this.props.cookies.remove("user"); // remove the cookie
    this.props.cookies.remove("admin"); // remove the cookie
    var response = await Axios({
      method: "GET",
      data: {},
      withCredentials: true,
      url: url + "/api/logout", // Should set to .ENV or DEFINE CONST
    });
    console.log("Logout Response: ", response);
    return response;
  };

  render = () => {
    return (
      <Router>
        <UserContext.Provider
          value={{
            currentLoginUser: this.state.currentLoginUser,
            loginUser: this.loginUser,
            logoutUser: this.logoutUser,
            registerUser: this.registerUser,
            updateUserContext: this.updateUserContext,
          }}
        >
          {this.props.children}
        </UserContext.Provider>
      </Router>
    );
  };
}

// export default withRouter(UserProvider);
export default withCookies(UserProvider);
