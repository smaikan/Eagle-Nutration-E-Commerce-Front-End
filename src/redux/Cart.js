import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const Cart = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    Addcart: (state, action) => {
      const { productId, aroma} = action.payload;
      

      const existingItem = state.find(
        (item) => item.productId === productId && item.aroma === aroma
      );

      if(existingItem){
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity
      }
      else{
      state.push({ ...action.payload});
      }
    },
    Getcart: (state, action) => {
      if (action.payload) return (state = action.payload);
    },
   RemoveCart: (state, action) => {
  const { productId, aroma } = action.payload;

  const item = state.find(
    (item) => item.productId === productId && item.aroma === aroma
  );

  if(item){
      return state.filter(
    (item) => !(item.productId === productId && item.aroma === aroma)
  );
  }
  
},
DecreaseCart: (state, action) => {
  const { productId, aroma } = action.payload;

  const index = state.findIndex(
    (i) => i.productId === productId && i.aroma === aroma
  );

  if (index !== -1) {
    if (state[index].quantity > 1) {
      state[index].quantity -= 1;
      state[index].totalPrice = state[index].quantity * state[index].unitPrice;
    } else {
      state.splice(index, 1); 
    }
  }
}
  },
});

export default Cart.reducer;
export const { Addcart, RemoveCart, Getcart,DecreaseCart } = Cart.actions;
