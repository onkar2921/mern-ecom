import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

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

export default function Register() {
  const navigate = useNavigate();

  const [field, setFields] = useState({
    name: "",
    email: "",
    password: "",
  
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...field, [name]: value,});
  };


  const apiUrl = process.env.REACT_APP_API_URL;
  const handelRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/Register`, {
        name: field.name,
        email: field.email,
        password: field.password,
       
      });

      if (response.status === 200) {
        // alert("register sucessfully")
        notify(response.data.message);
        navigate("/login");
        setFields({
          name: "",
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
      <Layout title="Register Page" para="MERN E-COM APP"></Layout>

      <form className="Register_form_div" onSubmit={handelRegister}>
        <label htmlFor="Name">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={field.name}
            onChange={handelChange}
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
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
       

        <button type="submit">Register</button>
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
