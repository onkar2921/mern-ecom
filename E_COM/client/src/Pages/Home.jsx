import "../CSS/Home.css"
import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { getProducts } from '../Components/getProducts'
import ProductCard from '../Components/ProductCard'

export default function Home() {

const [productBySell,setProductBySell]=useState([])
const [productByArival,setProductByArival]=useState([])
  
  const ProductsBySellRequest=()=>{
   getProducts ("getProductsList" , "sold").then((data)=>{
    console.log("data for sold",data)
    setProductBySell(data?.Products)
   })
 
  }


  const ProductsByArivalRequest=()=>{
    getProducts ("getProductsList" , "createdAt").then((data)=>{
      console.log("data",data?.Products)
     setProductByArival(data?.Products)
    })
  
   }

  useEffect(()=>{
    ProductsBySellRequest()
    ProductsByArivalRequest()
  },[])

  return (
   <>
   <Layout title="Home Page" para="MERN E-COM APP"></Layout>
<div className="Home_page_div">
      <h2>New Arivals</h2>
<div className="Arival_Product_div">
  
  {
    productByArival?.map((item)=>{
      console.log({photo:item.photo})
      return<>
          <ProductCard key={item._id}  id={item._id} name={item.name} description={item.description} price={item.price} photo={item?.photo}></ProductCard>
      </>
    })
  }
  </div>
  
  
  <h2>Products By Sell</h2>
  
  <div className="Sell_Product_div">
  {
    productBySell?.map((item)=>{
      return<>
          <ProductCard key={item._id}  id={item._id} name={item.name} description={item.description} price={item.price} photo={item?.photo}></ProductCard>
      </>
    })
  }
  </div>
    
</div>
   </>
  )
}
