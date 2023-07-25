import React from "react";
import axios from "axios";
import "../CSS/CartCard.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const notify = (message) =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export default function CartCard(props) {

  const apiUrl = process.env.REACT_APP_API_URL;


  const handelDecrementProduct = async () => {
    const UserId = localStorage.getItem("UserId");

    let token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${apiUrl}/decrementProductCount/${UserId}`,
        { ProductId: props.id },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        // alert(response.data.message)
        notify(response.data.message);
        // window.location.reload();
      } else {
        // alert(response.statusText)
        notify(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="Cart_Card">
        <h1>Product Id: {props.id}</h1>

        <h2>Product Name : {props.name}</h2>
        <p>Count : {props.count}</p>
        <p>Price Of One : {props.price}</p>
        <p>Price : {props.price * props.count}</p>
        <button onClick={handelDecrementProduct}>Decrement Product </button>
        {/* <button onClick={handelRemoveProduct}>Remove Product</button> */}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
