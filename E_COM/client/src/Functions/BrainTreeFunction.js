import axios from "axios"


export const getTokenBrainTree=async(UserId,Token)=>{
try {

    // console.log("userId",UserId,"token",Token)
    const apiUrl = process.env.REACT_APP_API_URL;

    const response=await axios.get(`${apiUrl}/braintree/getToken/${UserId}`,{ headers: { authorization: `Bearer ${Token}` }
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