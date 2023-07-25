import "../CSS/UserDashBoard.css";
import React, { useContext } from "react";
import Layout from "../Components/Layout";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

export default function UserDashBoard() {
  const { name, email, about, role } = useContext(UserContext);
  console.log("name", name);

  let UserId = localStorage.getItem("UserId");

  return (
    <>
      <Layout title="PROFILE" para="user profile"></Layout>

      <div className="UserDshBoard_div">
        <div className="user_link_info">
          <div className="info_div">
            <h2>USER INFORMATION</h2>
            <p>NAME: {name}</p>
            <p>EMAIL: {email}</p>
            <p>ABOUT: {about}</p>
            {role ? <p>ROLE: ADMIN</p> : <p>ROLE: USER</p>}
          </div>

          <div className="userLinks">
            <h3>User Links</h3>
            <Link to={`/cartPage/${UserId}`}>Cart</Link>
            <Link to="/updateProfile">Update Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
}
