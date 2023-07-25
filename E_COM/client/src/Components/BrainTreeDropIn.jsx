import React from 'react'
import DropIn from "braintree-web-drop-in-react";
 

export default function BrainTreeDropIn({clientToken,instance}) {
  return (
   <>

  <div className="BrainTreeDropIn">

    {
        // clientToken &&
         <>
        
            <DropIn options={{
                authorization:clientToken
            }}  onInstance={instance=>instance=instance} ></DropIn>
                <button >Order</button>
        </>
    }
  </div>
   
   
   
   </>  )
}
