import { createSlice } from "@reduxjs/toolkit";

const initialState=[]


export const Cart = createSlice({
    name:'Auth',
    initialState,
    reducers:{
     
     Addcart:(state,action)=>{
       return state=[...state,action.payload]
     },
     RemoveCart: (state, action) => {
        return state.filter((item) => item.id !== action.payload);
    }

}})

export default Cart.reducer;
export const {Addcart,RemoveCart} = Cart.actions;