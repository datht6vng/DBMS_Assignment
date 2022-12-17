import React from "react";
import { CartContext } from "../context/Cart";

const MenuList = ({ items, history, cookies }) => {
  var renderStar = (star) => {
    star = Math.floor(star);
    var yellowStar;
    var whiteStar;
    yellowStar = [...Array(star)].map((element, index) => (
      <li className={"menu-list-star menu-list-selected"}></li>
    ));
    whiteStar = [...Array(5 - star)].map((element, index) => (
      <li className={"menu-list-star"}></li>
    ));
    return (
      <ul class="menu-list-ratings">
        {yellowStar}
        {whiteStar}
      </ul>
    );
  };
  return (
    <CartContext.Consumer>
      {({ cartItems, addItemToCart, reduceItemFromCart }) => {
        return (
          <div className="section-center">
            {items.map((item) => {
              const { id, name, imgUrl, description, pricePU, star } = item;
              return (
                <div key={id} className="menu-item">
                  <img
                    src={imgUrl}
                    alt={name}
                    className="photo"
                    onClick={() => {
                      history.push(`menu/${item._id}`);
                    }}
                  />
                  <div className="item-info">
                    <div className="sub-item-info">
                      <header>
                        <div className="dish-name">
                          <h4> {name} </h4>
                        </div>
                        <div className="price"> $ {pricePU} </div>
                      </header>
                      <div>{renderStar(star)}</div>
                      {cookies.get("user") && (
                        <button
                          className="cart"
                          onClick={() => addItemToCart(item)}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};

export default MenuList;
