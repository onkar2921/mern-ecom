import "../CSS/UpdateProduct.css";
import { useState } from "react";
import React from "react";
import axios from "axios";

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

export default function UpdateProduct({
  id,
  token,
  AdminId,
  categories,
  setShowUpdateProductId,
}) {
  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
  });

  const handelCategory = (e) => {
    setCategory(e.target.value);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handelUpdate = async (e, ProductId) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/updateProduct/${AdminId}/${ProductId}`,
        {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: category,
          quantity: productData.qunatity,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        notify(response.data.message);
      } else {
        notify("product not updated");
      }

      // alert(response.data.message);

      setShowUpdateProductId(null); // Reset the showUpdateProductId state
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="update_div">
        <form onSubmit={(e) => handelUpdate(e, id)}>
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={productData.name}
            onChange={handelChange}
          />

          <input
            type="text"
            placeholder="Product Description"
            name="description"
            value={productData.description}
            onChange={handelChange}
          />

          <input
            type="number"
            placeholder="Product Price"
            name="price"
            value={productData.price}
            onChange={handelChange}
          />

          <label htmlFor="">
            Categories:
            <select name="category" value={category} onChange={handelCategory}>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <input
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handelChange}
          />

          <button type="submit">Submit</button>
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
