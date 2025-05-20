import { createSlice } from "@reduxjs/toolkit";

const initialState={ 
    CurrentAuth: JSON.parse(localStorage.getItem('CurrentAuth')) || null,
    Auths:[
    {
    id:1,
    name:'serhat kucı',
    email:'serhat@gmail.com',
    password:'serhat123'
    }
],

}


export const Auth = createSlice({
    name:'Auth',
    initialState,
    reducers:{
     UpdateAuth:(state,action)=>{
       state.CurrentAuth = action.payload;
       localStorage.setItem('CurrentAuth', JSON.stringify(action.payload))
     },DeleteAuth:(state)=>{
      state.CurrentAuth = {};
      localStorage.removeItem('CurrentAuth');
    },
     Addauth:(state,action)=>{
        state.Auths =[...state.Auths,action.payload]
     }
    }

})

export default Auth.reducer;
export const {UpdateAuth,DeleteAuth,Addauth} = Auth.actions;