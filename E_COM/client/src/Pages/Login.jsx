import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";

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

export default function Login() {
  const navigate = useNavigate();

  const [field, setFields] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...field, [name]: value });
  };

  const handelLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/Login", {
        email: field.email,
        password: field.password,
      });

      if (response.status === 200) {
        // alert("login sucessfully")
        // console.log(response.data.ValidUser)

        notify(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.ValidUser.role);
        localStorage.setItem("UserId", response.data.ValidUser._id);
        window.location.reload(); // Refresh the page2

        navigate("/");
        setFields({
          email: "",
          password: "",
        });
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
      <Layout title="Login Page" para="MERN E-COM APP"></Layout>

      <form className="Login_form_div" onSubmit={handelLogin}>
        <label htmlFor="email">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={field.email}
            onChange={handelChange}
          />
        </label>
        <label htmlFor="Password">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={field.password}
            onChange={handelChange}
          />
        </label>

        <button type="submit">Login</button>
      </form>

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
