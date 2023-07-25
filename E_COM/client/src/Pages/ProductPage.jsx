import "../CSS/ProductPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

export default function ProductPage() {
  const [ProductData, setProductData] = useState([]);
  const { ProductId } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  const getProductInfo = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/getSingleProduct/${ProductId}`
      );

      if (response.status === 200) {
        setProductData(response.data.getProduct);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [reletdProduct, setRelatedProduct] = useState([]);

  const getRelatedProduct = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/getRelatedProducts/${ProductId}`
      );
      if (response.status === 200) {
        setRelatedProduct(response.data.productsWithImages);
      } else {
        // alert(response.statusText)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductInfo();
    getRelatedProduct();
  }, [ProductId]);

  const category = ProductData;
  console.log("category", category);

  return (
    <>
      <Layout
        title={"Product Info"}
        para={"all information about a product"}
      ></Layout>
      <div className="Product_info_div">
        <div className="heading_info_div">
          <h1>{ProductData?.name}</h1>
          <img src={ProductData.photo} alt="image" />
        </div>

        <div className="Product_Lower_div">
          <p>Price : {ProductData.price}</p>
          <p>Description: {ProductData.description}</p>
          <p>Category : {category?.name}</p>
          <p>Quantity : {ProductData?.quantity}</p>
        </div>

        <div className="btn_div">
          {ProductData.quantity > 0 && <button>In Stock</button>}

          <button>Add To Cart</button>
        </div>
      </div>

      <div className="related_product_div">
        {reletdProduct?.map((item) => {
          return (
            <>
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                photo={item?.photo}
              ></ProductCard>
            </>
          );
        })}
      </div>
    </>
  );
}
