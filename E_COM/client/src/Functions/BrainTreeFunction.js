import axios from "axios"


export const getTokenBrainTree=async(UserId,Token)=>{
try {

    // console.log("userId",UserId,"token",Token)

    const response=await axios.get(`http://localhost:8000/braintree/getToken/${UserId}`,{ headers: { authorization: `Bearer ${Token}` }
})
        if(response.status===200){
                return response
        }else{
            alert(response.statusText)
        }
} catch (error) {
    console.log(error.message)
}
}