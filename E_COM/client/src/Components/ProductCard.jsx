import "../CSS/ProductCard.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

export default function ProductCard(props) {
  const { cart, Userdispatch } = useContext(UserContext);

  let token = localStorage.getItem("token");
  let UserId = localStorage.getItem("UserId");

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (token !== null) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, []);

  const [count, setCount] = useState(1);

  const handelCount = (e) => {
    setCount(e.target.value);
  };

  return (
    <>
      <div className="product_card_main_div">
        <div className="card_info_div">
          <h2>{props.name}</h2>
          <img src={props.photo} alt={props.photo} />
          <p>{props.description}</p>
          <p>{props.price}</p>
        </div>

        <select name="Count" onChange={handelCount}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <div className="card_btn_div">
          <Link to={`/ProductPage/${props.id}`}>
            <button className="ViewProduct">ViewProduct</button>
          </Link>
          {valid && (
            <button
              className="AddToCart"
              onClick={() =>
                Userdispatch({
                  type: "ADDTOCART",
                  payload: { id: props.id, token, UserId, count },
                })
              }
            >
              Add To cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}
