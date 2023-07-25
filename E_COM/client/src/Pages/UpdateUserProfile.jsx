import React, { useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import "../CSS/UpdateUserProfile.css";

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

export default function UpdateUserProfile() {
  let UserId = localStorage.getItem("UserId");

  let token = localStorage.getItem("token");

  const [userData, setUdserData] = useState({
    name: "",
    email: "",
    about: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setUdserData({ ...userData, [name]: value });
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handelUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${apiUrl}/updateUserProfile/${UserId}`,
        {
          name: userData.name,
          email: userData.email,
          about: userData.email,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // alert("profile updated")
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
      <Layout title="Update Profile" para="Free Feel To Do Changes"></Layout>

      <div className="update_profile_form_div">
        <form onSubmit={handelUpdateProfile} className="user_update_form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={handelChange}
          />

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handelChange}
          />

          <input
            type="text"
            placeholder="About"
            name="about"
            value={userData.about}
            onChange={handelChange}
          />
          <button type="submit">Update</button>
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
      />
    </>
  );
}
