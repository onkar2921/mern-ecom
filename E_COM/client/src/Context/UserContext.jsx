import { createContext, useEffect, useReducer } from "react";
import {UserReducer} from "../Reducers/UserReducers"
import axios from "axios"


export const UserContext=createContext(null)



const InitialUserContext={
    name:"",
    email:"",
    role:"",
    history:[],
    about:"",
    cart:[]
    
}

export function UserContextProvider({children}){

    const [state, Userdispatch] = useReducer(UserReducer, InitialUserContext)


    const UserId=localStorage.getItem("UserId")
    const token=localStorage.getItem("token")
    const apiUrl = process.env.REACT_APP_API_URL;
    const getUserData=async()=>{
       
        // alert(UserId)
        try {

            const response=await axios.get(`${apiUrl}/userProfile/${UserId}`,{
                headers: { authorization: `Bearer ${token}`}
            })
            if(response.status===200){
            
                Userdispatch({type:"SETUSER",payload:response?.data.User})
                // Userdispatch({type:"SETHISTORY",payload:response.data.User.history.products})
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }
    





    const getUserHistory=async()=>{
     
 
        try {

            const response=await axios.get(`${apiUrl}/userHistory/${UserId}`,{
                headers: { authorization: `Bearer ${token}`}
            })
            if(response.status===200){
            
               
                Userdispatch({type:"SETHISTORY",payload:response.data})
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }
    




    useEffect(()=>{
    getUserData()
    getUserHistory()

},[])





    return (
        <>
    <UserContext.Provider value={{...state,Userdispatch}}>
        {children}
    </UserContext.Provider>
        
        </>
    )
}