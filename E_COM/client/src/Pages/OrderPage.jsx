import React, { useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import { useEffect } from "react";
import "../CSS/OrderPage.css";

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

export default function OrderPage() {
  let token = localStorage.getItem("token");
  let AdminId = localStorage.getItem("UserId");

  const [order, setOrder] = useState([]);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getOrders/${AdminId}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log("orders---", response.data.AllOrders);
      if (response.status === 200) {
        setOrder(response.data.AllOrders);
      } else {
        // alert(response.statusText)
        notify(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [statusValue, setStatusValue] = useState([]);

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getStatus/${AdminId}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log("orders---", response.data.AllOrders);
      if (response.status === 200) {
        // console.log(response.data)
        setStatusValue(response.data);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
    getStatus();
  }, []);

  const handelOrderStatus = async (OrderId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/updateStatus/${AdminId}`,
        { OrderId, status },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        // console.log(response.data)
        notify(response.data.message);
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
      <Layout title="Order Page" para="See All Orders"></Layout>

      <div className="Orders_main_div">
        <h2>Order Count : {order.length}</h2>

        {order.map((item) => {
          let date = new Date(item.createdAt).toString();
          // date=date.toLocaleDateString()
          return (
            <>
              <div className="Show_Order_div">
                <h3>Order ID : {item._id}</h3>
                <p>Status : {item.status}</p>

                <select
                  name="Status"
                  onChange={(e) => handelOrderStatus(item._id, e.target.value)}
                >
                  <option>update status </option>
                  {statusValue.map((item) => {
                    console.log(item);
                    return (
                      <>
                        <option value={item}>{item}</option>
                      </>
                    );
                  })}
                </select>

                <p>Transaction Id: {item.transactionId}</p>
                <p>Amount : {item.amount}</p>
                <p>Order By : {item.user.name}</p>

                <p>Ordered On : {date}</p>
                <p>Deliverd Address : {item.address}</p>
                <h3>Total Products in Order : {item.products.length}</h3>
              </div>
            </>
          );
        })}
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
