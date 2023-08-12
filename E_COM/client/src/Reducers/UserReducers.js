import axios from "axios";
const REACT_APP_API_URL =process.env.REACT_APP_API_URL

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        ...state,
        name: action.payload?.name,
        email: action.payload?.email,
        role: action.payload?.role,
        history: action.payload?.history,
        about: action.payload?.about,
      };

    case "SETHISTORY":
      // console.log("history payload",action.payload)
      return {
        ...state,
        history: action.payload,
      };

    case "ADDTOCART":
      const getHistory = async () => {
        try {
          const response = await axios.post(
            `${REACT_APP_API_URL}/addToCart/${action.payload.UserId}`,
            { ProductId: action.payload.id, count: action.payload.count },
            {
              headers: { authorization: `Bearer ${action.payload.token}` },
            }
          );

          if (response.status === 200) {
            // console.log("user cart", response.data.UserCart.history)
            // console.log("reducer data",response.data.Cart)
            return {
              ...state,
              cart: response.data.Cart,
            };
          } else {
            alert(response.statusText);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      getHistory();
      // console.log("paylod of add to cart",action.payload)

      return {
        ...state,
      };

    case "CARTDATA":
      return {
        ...state,
        cart: action.payload,
      };

    case "MAKECARTEMPTY":
      alert("hitting empty")
      
      // alert("empty")
      return {
        state:[]
      };

    default:
      return {
        ...state,
      };
  }
};
