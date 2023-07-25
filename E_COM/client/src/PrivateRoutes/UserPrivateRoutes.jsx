import React, { useEffect, useState } from 'react'
import {Outlet, Navigate} from "react-router-dom"
export default function UserPrivateRoutes({ children, ...rest }) {
const [check,setCheck]=useState(false)

let token=localStorage.getItem("token")

const checkUSer=()=>{
    if(token!==null){
        setCheck(true)
    }else{
        setCheck(false)
    }
}

useEffect(()=>{
    checkUSer()
},[])

  return check ?<Outlet />:<Navigate to="/login" />
}
