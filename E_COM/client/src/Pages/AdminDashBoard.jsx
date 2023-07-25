import "../CSS/AdminDashBoard.css"
import "../CSS/UserDashBoard.css"
import React, { useContext, useEffect } from 'react'
import Layout from '../Components/Layout'
import { UserContext } from '../Context/UserContext'
import { Link } from "react-router-dom"

export default function AdminDashBoard() {

  const {name,email,about,role}=useContext(UserContext)
console.log("name",name)


  return (
    <>
    <Layout title="PROFILE" para="Admin profile"></Layout>
    
    <div className="AdminDshBoard_div">
     <div className="admin_link_info">
     <div className="info_div">
       <h2>ADMIN INFORMATION</h2>
        <p>NAME:  {name}</p>
        <p>EMAIL:  {email}</p>
        <p>ABOUT:  {about}</p>
        {role ? <p>ROLE:  ADMIN</p>:<p>ROLE:  USER</p>}
        
       </div>

    <div className="adminLinks">
      <h3>Admin Links</h3>
      <Link to="/createCategory">Create Category</Link>
      <Link to="/createProduct">Create Product</Link>
      <Link to="/orderPage">Orders</Link>
      <Link to="/updateDelete">Update / Delete</Link>
    </div>
     </div>







       {/* <div className="history_div">
        <h2>USER HISTORY</h2>
        <p>HISTORY:{history}</p>
       </div> */}
    </div>
    </>
    
  )
}
