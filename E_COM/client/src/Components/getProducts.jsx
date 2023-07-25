
import axios from "axios"
export const getProducts=async(name,sortBy)=> {
 
  
    
    
    const response=await axios.get(`http://localhost:8000/${name}?sortBy=${sortBy}`)

    if(response.status===200){
        // alert("getting producst")
        return response.data
    }
    // return alert(response.statusText)
    

}
