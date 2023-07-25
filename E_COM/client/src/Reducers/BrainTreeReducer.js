import axios from "axios"

export const BrainTreeReducer=(state,action)=>{
    switch (action.type) {
       
       case "SET_TOKEN":
        return{
            ...state,
            clientToken:action.payload

        }
    
        default:

            return{
                ...state
            }
    }
}


