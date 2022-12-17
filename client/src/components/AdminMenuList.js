import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./AdminMenuList.css";
import EditMenuForm from "./EditMenuForm";
import MenuDetail from "../pages/MenuDetail";
import Axios from "axios";

const url = "http://localhost:4000";

const AdminMenuList = ({
  items,
  history,
  cookies,
  categories,
  updateAllFoods,
}) => {
  var renderStar = (star) => {
    star = Math.floor(star);
    var yellowStar;
    var whiteStar;
    yellowStar = [...Array(star)].map((element, index) => (
      <li key={index} className={"menu-list-star menu-list-selected"}></li>
    ));
    whiteStar = [...Array(5 - star)].map((element, index) => (
      <li key={index + 10} className={"menu-list-star"}></li>
    ));
    return (
      <ul className="menu-list-ratings">
        {yellowStar}
        {whiteStar}
      </ul>
    );
  };

  const showConfirmDialog = (_id) => {
    return confirmAlert({
      title: "Warning!",
      message: "Are you sure to delete this dish?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => await deleteDish(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteDish = async (_id) => {
    var response = await Axios({
      method: "POST",
      data: {
        _id: _id,
      },
      withCredentials: true,
      url: url + "/api/admin/delete_food", // Should set to .ENV or DEFINE CONST
    });
    await updateAllFoods();
  };

  return (
    <div className="section-center">
      {items.map((item) => {
        const { _id, name, imgUrl, description, pricePU, star } = item;
        return (
          !item.isDeleted && (
            <div key={_id} className="menu-item">
              <img src={imgUrl} alt={name} className="photo" />
              <div className="item-info">
                <div className="sub-item-info">
                  <header>
                    <div className="dish-name">
                      <h4> {name} </h4>
                    </div>
                    <div className="price"> {`$ ${pricePU}`} </div>
                  </header>
                  <div>{renderStar(star)}</div>
                  {cookies.get("user") && cookies.get("admin") && (
                    <div className="admin-dish-btn-array">
                      <Popup
                        className="edit-menu-popup"
                        modal
                        trigger={
                          <button className="edit-dish-btn">Edit Dish</button>
                        }
                      >
                        {(close) => (
                          <div className="edit-menu-pop-up-body">
                            <div className="edit-menu-popup-dish-detail">
                              <MenuDetail
                                history={history}
                                cookies={cookies}
                                updateAllFoods={() => {
                                  alert("You are in Edit Menu Page");
                                }}
                                _id={item._id}
                                menuItems={items}
                              />
                            </div>
                            <div className="edit-menu-popup-form">
                              <EditMenuForm
                                _id={item._id}
                                history={history}
                                menuItems={items}
                                categories={categories}
                              />
                            </div>
                          </div>
                        )}
                      </Popup>
                      <button
                        onClick={() => {
                          showConfirmDialog(item._id);
                        }}
                        className="delete-dish-btn"
                      >
                        Delete Dish
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default AdminMenuList;
