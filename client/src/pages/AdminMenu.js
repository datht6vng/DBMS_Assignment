import React, { Component, useState } from "react";
import AdminMenuList from "../components/AdminMenuList";
import EditMenuForm from "../components/EditMenuForm";
import Categories from "../components/Categories";
import "./Menu.css";
import "./AdminMenu.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AdminMenu = (props) => {
  let allCategories = [
    "ALL",
    ...new Set(props.items.map((item) => item.category)),
  ];

  const [menuItems, setMenuItems] = useState(props.items);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categories, setCategories] = useState(allCategories);

  React.useEffect(() => {
    setMenuItems(props.items);
    setCategories([
      "ALL",
      ...new Set(props.items.map((item) => item.category)),
    ]);
    setActiveCategory("ALL");
  }, [props.items]);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "ALL") {
      setMenuItems(props.items);
      return;
    }
    const newItems = props.items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main className="background">
      <div className="admin-welcome">
        <div className="admin-welcome-text">
          Restaurant Menu
          <br></br>
          Last edit at 2/12/2021
          <br></br>
          <button
            className="back-to-menu-button"
            onClick={() => {
              props.history.push("/admin");
            }}
          >
            Back To Administration Center
          </button>
        </div>
      </div>
      <div className="background">
        <section className="menu section">
          <div className="admin-title">
            <div>
              <h2> Current Restaurant Menu List </h2>
              <div className="underline"> </div>{" "}
            </div>
            <Popup
              className="create-menu-popup"
              modal
              trigger={<button className="add-dish-btn">Add New Dish</button>}
            >
              {(close) => (
                <div className="create-menu-pop-up-body">
                  <div className="create-menu-popup-form">
                    <EditMenuForm
                      history={props.history}
                      menuItems={menuItems}
                      categories={categories}
                    />
                  </div>
                </div>
              )}
            </Popup>
          </div>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            filterItems={filterItems}
          />{" "}
          <AdminMenuList
            updateAllFoods={props.updateAllFoods}
            cookies={props.cookies}
            history={props.history}
            items={menuItems}
            categories={categories}
          />{" "}
        </section>{" "}
      </div>
    </main>
  );
};

export default AdminMenu;
