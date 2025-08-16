import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  proteinProducts:[],
  hacimProducts:[],
  performansProducts:[],
  zayiflamaProducts:[],
  giyimProducts:[],
  aksesuarProducts:[],



};

export const Products = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.allProducts = action.payload.all || [];
  state.proteinProducts = action.payload.protein || [];
  state.hacimProducts = action.payload.hacim || [];
  state.performansProducts = action.payload.performans || [];
  state.zayiflamaProducts = action.payload.zayiflama || [];
  state.giyimProducts = action.payload.giyim || [];
  state.aksesuarProducts = action.payload.aksesuar || [];
    }
  },
});

export default Products.reducer;
export const {setProducts} = Products.actions;