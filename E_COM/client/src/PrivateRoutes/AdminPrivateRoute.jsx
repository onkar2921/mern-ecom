import React, { useEffect, useState } from 'react'
import {Outlet,Navigate} from "react-router-dom"
export default function AdminPrivateRoute() {
  
    const [check,setCheck]=useState(false)

    let token=localStorage.getItem("token")
    let role=localStorage.getItem("role")

    const checkAdmin=()=>{
        if(token!==null && role!==1){
            setCheck(true)
        }else{
            setCheck(false)
        }
    }


    useEffect(()=>{
        checkAdmin()
    },[])
  
    return check ?<Outlet/> :<Navigate to="/login" />
}
