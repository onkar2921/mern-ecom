import "../CSS/AdminUpdateDeletePage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import UpdateProduct from "../Components/UpdateProduct";

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

export default function UpdateDeletePage() {
  let token = localStorage.getItem("token");
  let AdminId = localStorage.getItem("UserId");
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllProducts`);

      if (response.status === 200) {
        setProducts(response.data.productsWithImages);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllCategory`);
      if (response.status === 200) {
        setCategories(response.data.AllCategory);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handelDelete = async (e, productId) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${apiUrl}/deleteProduct/${AdminId}/${productId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // alert(response.data.message);
        notify(response.data.message);
      } else {
        // alert(response.statusText);
        notify(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [showUpdateProductId, setShowUpdateProductId] = useState(null); // Track the product ID for which "Show Update" button is clicked

  const handleShowUpdate = (productId) => {
    setShowUpdateProductId(productId);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateProductId(false);
  };

  return (
    <>
      <Layout title="Update / Delete"></Layout>

      <div className="update_delete_main_div">
        <div className="product_div">
          {products?.map((item) => (
            <div className="ProductCard" key={item._id}>
              <p>Product Name: {item.name}</p>
              <div className="options_div">
                <button onClick={() => handleShowUpdate(item._id)}>
                  Show Update
                </button>
                <button onClick={(e) => handelDelete(e, item._id)}>
                  Delete
                </button>
              </div>
              {showUpdateProductId === item._id && (
                <>
                  <UpdateProduct
                    id={item._id}
                    token={token}
                    AdminId={AdminId}
                    categories={categories}
                    setShowUpdateProductId={setShowUpdateProductId}
                  />

                  <button onClick={handleCloseUpdateForm}>Close</button>
                </>
              )}
            </div>
          ))}
        </div>
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
