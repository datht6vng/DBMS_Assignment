import React, { Component, useState } from "react";
import MenuList from "../components/MenuList";
import Categories from "../components/Categories";
import "./Menu.css";
import image from "../images/b.png";
const Menu = (props) => {
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
      <div className="welcome">
        <div className="welcome-text">
          Welcome to our restaurent!
          <br />
          Scroll down to view the menu
        </div>
      </div>
      <div className="background">
        <section className="menu section">
          <div className="title">
            <h2> Menu List </h2> <div className="underline"> </div>{" "}
          </div>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            filterItems={filterItems}
          />{" "}
          <MenuList
            cookies={props.cookies}
            history={props.history}
            items={menuItems}
          />{" "}
        </section>{" "}
      </div>
    </main>
  );
};

export default Menu;
