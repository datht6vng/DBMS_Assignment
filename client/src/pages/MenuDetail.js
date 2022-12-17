import React, { Component } from "react";
import "./MenuDetail.css";
import { CartContext } from "../context/Cart";
import FeedbackForm from "../components/FeedbackForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FoodQuantityForm from "../components/FoodQuantityForm";

/**
 * if props.match == null, PostItem is contained in Admin EditMenuForm popup
 * else, PostItem is contained in Customer MenuDetail
 */
function PostItem(props) {
  const { match } = props;

  var renderStar = (star) => {
    star = Math.floor(star);
    var yellowStar;
    var whiteStar;
    yellowStar = [...Array(star)].map((element, index) => (
      <li key={index} className={"menu-detail-star menu-detail-selected"}></li>
    ));
    whiteStar = [...Array(5 - star)].map((element, index) => (
      <li key={index + 10} className={"menu-detail-star"}></li>
    ));
    return (
      <ul className="menu-detail-ratings">
        {yellowStar}
        {whiteStar}
      </ul>
    );
  };
  return (
    <div className="post-item">
      <h2 className="post-name"> {props.food_name}</h2>
      {props.match && (
        <button
          className="post-button-BTM"
          type="submit"
          onClick={() => {
            props.history.push("/admin/menu");
          }}
        >
          Back To Menu
        </button>
      )}
      <div>
        <img className="post-img" src={props.image} />
      </div>
      <h2 className="post-Ingredient">Ingredient</h2>
      <div className="post-desc">{props.food_description}</div>
      <h3 className="post-price">Prices: &nbsp; {props.food_price} $</h3>
      <div className="food-rating-wrapper">
        <h3 className="food-rating-title">Rating: </h3>
        <div className="food-rating-star">{renderStar(props.star)}</div>
      </div>
      {props.cookies.get("user") && props.match && (
        <Popup
          className="quantity-popup"
          modal
          trigger={<button className="post-button-ATC">Add To Cart</button>}
        >
          {(close) => (
            <div>
              <button className="close" onClick={close}>
                &times;
              </button>
              <FoodQuantityForm {...props} />
            </div>
          )}
        </Popup>
      )}
    </div>
  );
}

class MenuDetail extends React.Component {
  // componentDidMount() {
  //   window.scrollTo(0, 0);
  // }
  render() {
    const { history, match, location, cookies, menuItems } = this.props;
    let _id = null;
    if (match) {
      _id = match.params._id;
    } else {
      _id = this.props._id;
    }
    const itemIndex = menuItems.findIndex((item) => item._id == _id);
    return (
      <CartContext.Consumer>
        {({ cartItems, addItemToCart, reduceItemFromCart }) => {
          return (
            <div className="menu-detail-back-ground">
              {menuItems.length ? (
                <PostItem
                  key={menuItems[itemIndex]._id}
                  _id={_id}
                  food_name={menuItems[itemIndex].name}
                  image={menuItems[itemIndex].imgUrl}
                  food_description={menuItems[itemIndex].description}
                  food_price={menuItems[itemIndex].pricePU}
                  star={menuItems[itemIndex].star}
                  history={history}
                  addItemToCart={addItemToCart}
                  cookies={this.props.cookies}
                  menuItem={this.props.menuItems[itemIndex]}
                  match={this.props.match}
                />
              ) : (
                <div />
              )}
              {cookies.get("user") && !this.props._id && (
                <FeedbackForm
                  foodID={_id}
                  updateAllFoods={this.props.updateAllFoods}
                />
              )}
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default MenuDetail;
