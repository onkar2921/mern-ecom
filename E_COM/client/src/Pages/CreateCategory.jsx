import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import "../CSS/CreateCategory.css";

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

export default function CreateCategory() {
  const [name, setName] = useState("");


  const apiUrl = process.env.REACT_APP_API_URL;

  const handelCreateCategory = async (e) => {
    e.preventDefault();
    let AdminId = localStorage.getItem("UserId");
    let token = localStorage.getItem("token");
    // console.log("hitting")

    const response = await axios.post(
      `${apiUrl}/createCategory/${AdminId}`,
      {
        //data
        name,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
      );
      if (response.status === 200) {
      notify(response.data.message);
    } else {
      notify(response.statusText);
    }
  };
  
  return (
    <>
      <Layout title="Create Category " para="Ready to Create Category"></Layout>
      <div className="create_category_div">
        <form className="category_form" onSubmit={handelCreateCategory}>
          <input
            type="text"
            placeholder="Category Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create Category</button>
        </form>
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
      />;
    </>
  );
}
