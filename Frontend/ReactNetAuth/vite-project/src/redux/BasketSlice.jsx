import {createSlice} from "@reduxjs/toolkit"



const getBasketFromStoreage =()=>{
    if(localStorage.getItem("basket")){
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

const initialState = {
    products : getBasketFromStoreage(),
    totalAmount : 0
}



const writeBasketFromStoreage =(basket)=>{
    localStorage.setItem("basket",JSON.stringify(basket))
}






export const BasketSlice = createSlice({
    name:"Basket",
    initialState,
    reducers:{

//Add Basket
addToBasket : (state,action)=>{
    const findProduct = state.products && state.products.find((product)=>product.id === action.payload.id);
    if(findProduct)
    {
        const extractedProduct = state.products.filter((product)=>product.id !== action.payload.id);
        findProduct.count += action.payload.count;
        state.products=[...extractedProduct,findProduct];
        writeBasketFromStoreage(state.products);
    }
    else{
        state.products=[...state.products,action.payload];
        writeBasketFromStoreage(state.products);
    }

},
//Remove Basket
removeFromCart:(state,action)=>{
    state.products = state.products.filter(product=>product.id !== action.payload.id)
    localStorage.setItem("basket",JSON.stringify(state.products))   
},
completeCard:(state,action)=>{
    state.products = [];
    localStorage.removeItem("basket");
}
        }
    },
    
)

export const {addToBasket,removeFromCart,completeCard} = BasketSlice.actions
export default BasketSlice.reducer