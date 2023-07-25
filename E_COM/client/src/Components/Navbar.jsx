import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../CSS/Navbar.css";
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
 
  const navigate=useNavigate()

 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("UserId")
    navigate("/login")
    window.location.reload(); // Refresh the page
  };


  const [valid, setValid] = useState(false);
  const [admin,setAdmin]=useState(false)

  let role=localStorage.getItem("role")

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null && role!=="1") {
      setValid(true);
    } else {
      
      setValid(false);
    }


    if(role==="1"){
      setAdmin(true)
    }else{
      setAdmin(false)
    }
  }, []);


let UserId=localStorage.getItem("UserId")

  return (
    <>
      <div className="Nav-div">
        <ul className='Nav-list'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
         {!UserId && <>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
         </>}
         {valid && <>
         <li>
            <Link to="/userProfile">UserProfile</Link>
            
          </li>

          <li>
            <Link to={`/CartPage/:${UserId}`}>Cart</Link>
            
          </li>
          
         </>
          
          
          }

          {admin &&  <li>
            <Link to="/adminProfile">Admin</Link>
          </li>}
        </ul>

        {(valid && role==="0"||role=="1" )&& <button  className='logout' onClick={handleLogout}>Logout</button>}
      </div>
    </>
  );
}
