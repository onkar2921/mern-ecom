import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../Components/CartCard";
import { UserContext } from "../Context/UserContext";
import { BrainTreeContext } from "../Context/BrainTreeContext";
import DropIn from "braintree-web-drop-in-react";
import "../CSS/CartPage.css"
import Layout from "../Components/Layout"
import {useNavigate} from"react-router-dom"


import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => toast(message);

export default function CartPage() {

  const navigate=useNavigate()

  const [instance, setInstance] = useState("");

  const { clientToken } = useContext(BrainTreeContext);
  
  const UserId = localStorage.getItem("UserId");
  
  let token = localStorage.getItem("token");
  
  const { cart, Userdispatch } = useContext(UserContext);


  const apiUrl = process.env.REACT_APP_API_URL;


  const getCartData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/getUserCart/${UserId}`,
        { headers: { authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
        // console.log("return data", response.data.UserCart.userCart);
        // notify(response.data.message)
        Userdispatch({
          type: "CARTDATA",
          payload: response.data.UserCart.userCart,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log("cart data",state.cart)
  let sum = 0;
  const TotalPrice = () => {
    cart?.map((item) => {
      sum += item?.ProductId.price * item?.count;
    });
  };

  useEffect(() => {
    getCartData();
  }, [UserId]);

  

  TotalPrice();

  // useEffect(()=>{
  // // refresh when change in count of product
  // },[cart])

  const [paymentDrop, setPaymentDrop] = useState(false);
  const handelPayment = () => {
    alert("payment hitting");

    setPaymentDrop(true);
    console.log("payment drop", paymentDrop);
  };

  const handelOrder = async () => {
    let ProccedOrder = false;
    try {
      // /braintree/payments

      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post(
        `${apiUrl}/braintree/payments/${UserId}`,
        {
          amount: sum,
          paymentMethodNonce: nonce,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        console.log("Response of order", response.data);
        alert(response.data.message);
        ProccedOrder = true;
        setPaymentDrop(false)
        console.log(cart)
        Userdispatch({type:"MAKECARTEMPTY"})
        console.log(cart)


      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }

    try {
      if (ProccedOrder) {
        const response = await axios.post(
          `${apiUrl}/createOrder/${UserId}`,
          {
            Products: cart,
            amount: sum,
            address: "at post kalwadi",
            transactionId: "123456789",
          },
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          console.log("response of order", response.data);
          alert(response.data.message);
          // window.location.reload();
        } else {
          alert(response.statusText);
        }
      } else {
        alert("failed in payment");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log("token of brain tree", clientToken);

  useEffect(() => {
    // if (cart.length < 1) {
    //   setTimeout(() => {
    //     navigate("/shop");
        
    //   }, 2000);
    // }
  }, []);

  return (
    <>
    <Layout title="Cart" para="Happpy shopping"></Layout>
      
    {
      cart?.length>0 ?  <div className="cart_main_div">
        
      
      <div className="Cart_div">

      
{cart?.map((item) => {
  // console.log("map data", item.ProductId.name);
  
  return (
    <>
      <CartCard
        id={item?.ProductId._id}
        name={item?.ProductId.name}
        count={item?.count}
        price={item?.ProductId.price}
        ></CartCard>
    </>
  );
})}

<h2>Total Price : {sum} </h2>






<div className="drop_div">
  {paymentDrop
    && <DropIn
    options={{ authorization: clientToken }}
    onInstance={(instance) => setInstance(instance)}
    />
  }

</div>
    <div className="Order_Options">

 {!paymentDrop &&

 <button onClick={handelPayment}>Payment</button>
 } 
  <button onClick={handelOrder}>Order</button>
    </div>
      </div>




  </div>

  :<>
<div className="emptyCartDiv">
  <h2>Cart is Empty</h2>
</div>
  </>
    }
    </>
  );
}
