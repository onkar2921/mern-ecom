import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import AdminDashBoard from "./Pages/AdminDashBoard";
import UserDashBoard from "./Pages/UserDashBoard";
import { useEffect, useState } from "react";
import { UserContextProvider } from "./Context/UserContext";
// import UserCart from "./Pages/UserCart";
import UpdateUserProfile from "./Pages/UpdateUserProfile";
import CreateCategory from "./Pages/CreateCategory";
import CreateProduct from "./Pages/CreateProduct";
import ShopPage from "./Pages/ShopPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import { BrainTreeContextProvider } from "./Context/BrainTreeContext";
import OrderPage from "./Pages/OrderPage";
import UpdateDeletePage from "./Pages/UpdateDeletePage";

function App() {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  let token = localStorage.getItem("token");

  const checkUser = () => {
    if (token !== null) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  let role = localStorage.getItem("role");
  // console.log("role", role);

  const checkAdmin = () => {
    if (role === "1" && token !== null) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <BrainTreeContextProvider>
        <UserContextProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/shop" element={<ShopPage />}></Route>
            <Route
              path="/ProductPage/:ProductId"
              element={<ProductPage />}
            ></Route>

            {user && (
              <>
                <Route path="/userProfile" element={<UserDashBoard />}></Route>
                {/* <Route path="/userCart" element={<UserCart />}></Route> */}
                <Route
                  path="/updateProfile"
                  element={<UpdateUserProfile />}
                ></Route>
                <Route path="/cartPage/:UserId" element={<CartPage />}></Route>
              </>
            )}

            {admin && (
              <>
                <Route
                  path="/adminProfile"
                  element={<AdminDashBoard />}
                ></Route>
                <Route
                  path="/createCategory"
                  element={<CreateCategory />}
                ></Route>
                <Route
                  path="/createProduct"
                  element={<CreateProduct />}
                ></Route>
                <Route path="/orderPage" element={<OrderPage />}></Route>
                <Route
                  path="/updateDelete"
                  element={<UpdateDeletePage />}
                ></Route>
              </>
            )}
          </Routes>
        </UserContextProvider>
      </BrainTreeContextProvider>
    </>
  );
}

export default App;

// use env variables
// {process.env.REACT_APP_API_URL/..........}
