import React from "react";
import "./Categories.css";

const Categories = ({ categories, filterItems, activeCategory }) => {
  var categoryImageUrls = {
    ALL: "https://cdn-icons-png.flaticon.com/512/2362/2362268.png",
    PIZZA: "https://d29fhpw069ctt2.cloudfront.net/icon/image/59558/preview.svg",
    BURGER:
      "https://cdn0.iconfinder.com/data/icons/foody-icons/32/FoodyIcons_color-06-512.png",
    TEA: "https://icon-library.com/images/tea-icon/tea-icon-12.jpg",
    SOUP: "https://cdn-icons-png.flaticon.com/512/454/454570.png",
    OTHER: "https://icon-library.com/images/135944452untitled-3-512.png",
  };

  return (
    <div className="btn-container categories-wrapper">
      {" "}
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className={`${
              activeCategory === category ? "filter-btn active" : "filter-btn"
            }`}
            key={index}
            onClick={() => filterItems(category)}
          >
            {" "}
            <img
              className="category-icon"
              src={categoryImageUrls[category]}
            />{" "}
            {category}{" "}
          </button>
        );
      })}{" "}
    </div>
  );
};

export default Categories;
