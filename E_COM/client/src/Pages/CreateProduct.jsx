import "../CSS/CreateProduct.css";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
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

const apiUrl = process.env.REACT_APP_API_URL;

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllCategory`);
      if (response.status === 200) {
        // alert("get all categories")
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

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    shipping: false,
    qunatity: "",
  });

  const [category, setCategory] = useState("");

  const handelCategory = (e) => {
    setCategory(e.target.value);
  };

  const [photo, setPhoto] = useState(null);
  const handelChange = (e) => {
    const { name, value } = e.target;

    setProductData({ ...productData, [name]: value });
  };

  // console.log("shipping",productData.shipping)

  const handelCreateProduct = async (e) => {
    e.preventDefault();
    let AdminId = localStorage.getItem("UserId");
    let token = localStorage.getItem("token");

    console.log("product data", productData);
    const formdata = new FormData();

    console.log("category", category);
    formdata.append("name", productData.name);
    formdata.append("description", productData.description);
    formdata.append("price", productData.price);
    formdata.append("category", category);

    formdata.append("shipping", productData.shipping);
    formdata.append("quantity", productData.qunatity);

    formdata.append("photo", photo);
    // console.log("photo form data",photo)

    // console.log("from data", formdata);

    const response = await axios.post(
      `${apiUrl}/createProducut/${AdminId}`,
      formdata,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      // alert("product created")
      notify(response.data.message);
    } else {
      notify(response.statusText);
      // alert(response.statusText)
    }
  };

  return (
    <>
      <Layout title="Create Product " para="Ready to Create Product"></Layout>

      <div className="create_product_div">
        <form className="product_form" onSubmit={handelCreateProduct}>
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
            Categories :
            <select name="category" value={category} onChange={handelCategory}>
              {categories.map((item) => {
                return (
                  <>
                    <option value={item._id}>{item.name}</option>
                  </>
                );
              })}
            </select>
          </label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="qunatity"
            value={productData.qunatity}
            onChange={handelChange}
          />
          <label htmlFor="">
            Shipping :
            <input
              type="checkbox"
              name="shipping"
              value={true}
              onChange={handelChange}
            />
          </label>

          <input
            type="file"
            placeholder="Product Image"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button type="submit">Create Product</button>
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
      </div>
    </>
  );
}
