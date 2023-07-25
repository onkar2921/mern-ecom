import { createContext, useEffect, useReducer } from "react";
import {BrainTreeReducer} from "../Reducers/BrainTreeReducer"
import { getTokenBrainTree } from "../Functions/BrainTreeFunction";


export const BrainTreeContext=createContext(null)



const InitialBrainTreeContext={

    clientToken:null,
    instance:{},
    address:"",
    
}




let UserId=localStorage.getItem("UserId")
let Token=localStorage.getItem("token")



export function BrainTreeContextProvider({children}){


    


    useEffect(()=>{

    getTokenBrainTree(UserId,Token).then((item)=>{
            
            const ClientToken=item.data
            BrainTreedispatch({type:"SET_TOKEN",payload:ClientToken})
        })


    
    
    },[UserId])
    



    const [state, BrainTreedispatch] = useReducer(BrainTreeReducer, InitialBrainTreeContext)

    
    
 



    return (
        <>
    <BrainTreeContext.Provider value={{...state,BrainTreedispatch}}>
        {children}
    </BrainTreeContext.Provider>
        
        </>
    )
}