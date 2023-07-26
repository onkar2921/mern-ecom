import "../CSS/ShopPage.css";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { prices } from "../Assets/Prices";
import ProductCard from "../Components/ProductCard";
export default function ShopPage() {
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

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

  const [selectCategory, setSelectCategory] = useState([]);

  const handelCategory = (e) => {
    let category = e.target.value;
    let indexOfCategory = selectCategory.indexOf(category);

    const newSelectCategory = [...selectCategory];

    if (indexOfCategory === -1) {
      newSelectCategory.push(category);
    } else {
      newSelectCategory.splice(category, 1);
    }
    setSelectCategory(newSelectCategory);
    // console.log("selected categories",selectCategory)
  };

  const [selectPrice, setSelectPrice] = useState(0);

  const handelPrice = (e) => {
    const priceArray = e.target.value.split(","); // Assuming the value is a comma-separated string
    const parsedPriceArray = priceArray.map((item) => parseInt(item.trim()));
    setSelectPrice(parsedPriceArray);
  };

  const [searchProductData, setSearchProductData] = useState([]);

  const searchProduct = async () => {
    try {
      // console.log("filter",filters)

      const response = await axios.post(
        `${apiUrl}/ProductsBySearch`,
        { category: selectCategory, price: selectPrice, search }
      );

      if (response.status === 200) {
        setSearchProductData(response.data?.Products);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(()=>{ console.log("filter",filters)

  // // searchProduct()
  // },[filters])

  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllProducts`);

      if (response.status === 200) {
        setAllProducts(response.data?.Products);
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

  return (
    <>
      <Layout title={"Shop Page"} para={"Shop Your Books"}></Layout>

      <div className="shop_page_div">
        <div className="shop_left_div">
          <div className="search_div">
            <input
              type="text"
              placeholder="SEARCH"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button onClick={searchProduct}>Search</button>
          </div>

          <h2>Find By Categories</h2>
          <div className="showCategory">
            {categories.map((item, index) => {
              return (
                <>
                  <li key={index}>
                    <input
                      type="checkbox"
                      name={item.name}
                      value={item._id}
                      onChange={handelCategory}
                    />
                    <label htmlFor="">{item.name}</label>
                  </li>
                </>
              );
            })}
          </div>

          <h2>Find By Prices</h2>
          <div className="showPrice">
            {prices.map((item) => {
              return (
                <>
                  <li key={item.id}>
                    <input
                      type="radio"
                      name="priceRange"
                      value={item.arry}
                      onChange={handelPrice}
                    />
                    <label>{item.name}</label>
                  </li>
                </>
              );
            })}
          </div>
        </div>
        <div className="shop_right_div">
          {searchProductData.length > 0 ? (
            searchProductData.map((item) => {
              return (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  photo={item.photo}
                  description={item.description}
                  price={item.price}
                />
              );
            })
          ) : (
            <>
              {allProducts?.map((item) => {
                return (
                  <ProductCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    photo={item.photo}
                    description={item.description}
                    price={item.price}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
