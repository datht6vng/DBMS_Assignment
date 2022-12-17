import React, { Component } from "react";
import Form from "../common/form";
import "./RegisterForm.css";
import "./EditMenuForm.css";
import JoiBase from "joi";
import JoiDate from "@hapi/joi-date";
import Axios from "axios";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Categories from "./Categories";
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const url = "http://localhost:4000";

class EditMenuForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        category: "",
        pricePU: "",
        description: "",
        imgUrl: "",
      },
      errors: {},
      notification: "",
      categories: [],
    };
  }

  capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };

  componentDidMount = () => {
    const categories = this.props.categories.map((category) => {
      return {
        label: this.capitalize(category),
        value: category,
      };
    });
    this.setState({ categories });

    if (this.props._id) {
      const itemIndex = this.props.menuItems.findIndex(
        (item) => item._id == this.props._id
      );
      const item = this.props.menuItems[itemIndex];
      const newData = {
        name: item.name,
        category: item.category,
        pricePU: item.pricePU,
        description: item.description,
        imgUrl: item.imgUrl,
      };
      this.setState({
        data: { ...newData },
      });
    }
  };

  schema = Joi.object({
    name: Joi.string().required().label("Food Name"),
    category: Joi.string()
      .required()
      .label("Category")
      .valid(...this.props.categories)
      .messages({
        "string.domain": "Please choose category type",
      }),
    pricePU: Joi.number()
      .required()
      .min(1.99)
      .max(10000.0)
      .label("Price Per Unit"),
    description: Joi.string().required().label("Description"),
    imgUrl: Joi.string().required().label("Image URL"),
  });

  showConfirmDialog = () => {
    return confirmAlert({
      title: "Warning!",
      message: "Are you sure to edit this menu?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleSumbit(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  doSubmit = async () => {
    if (this.props._id) {
      const formData = {
        ...this.state.data,
        _id: this.props._id,
      };
      const response = await Axios({
        method: "POST",
        data: {
          ...formData,
        },
        withCredentials: true,
        url: url + "/api/admin/edit_food", // Should set to .ENV or DEFINE CONST
      });
      console.log(response);
      if (response.data.success) {
        this.props.history.go(0);
      }
    } else {
      const formData = {
        ...this.state.data,
      };
      const response = await Axios({
        method: "POST",
        data: {
          ...formData,
        },
        withCredentials: true,
        url: url + "/api/admin/add_food", // Should set to .ENV or DEFINE CONST
      });
      console.log(response);
      if (response.data.success) {
        this.props.history.go(0);
      }
    }
  };

  render() {
    const { onUserRegister, categories } = this.props;

    return (
      <div>
        <div>
          <div className="edit-menu-form-wrapper">
            <div className="edit-menu-form-outer">
              {this.props._id && (
                <h1 className="edit-menu-form-title"> Edit Dish Form </h1>
              )}
              {!this.props._id && (
                <h1 className="edit-menu-form-title"> Create Dish Form </h1>
              )}
              <p className="notification">{this.state.notification}</p>
              <form className="form-body" onSubmit={this.handleSumbit}>
                {" "}
                {this.renderInput("name", "Name")}{" "}
                {this.renderSelect(
                  "category",
                  "Category",
                  this.state.categories
                )}{" "}
                {this.renderInput("pricePU", "Price Per Unit")}{" "}
                {this.renderInput("description", "Food Description")}{" "}
                {this.renderInput("imgUrl", "Image URL")}{" "}
                {/* Since this.validateProperty has setState({}), every time some input in form changed, the form rerender, this.validate() fires to return updated value */}{" "}
                {this.props._id && this.renderButton("Edit Dish")}{" "}
                {!this.props._id && this.renderButton("Create New Dish")}{" "}
              </form>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditMenuForm;
