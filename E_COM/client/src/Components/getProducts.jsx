
import axios from "axios"
export const getProducts=async(name,sortBy)=> {
    const apiUrl = process.env.REACT_APP_API_URL;
  
    
    
    const response=await axios.get(`${apiUrl}/${name}?sortBy=${sortBy}`)

    if(response.status===200){
        // alert("getting producst")
        return response.data
    }
    // return alert(response.statusText)
    

}
