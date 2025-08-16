import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Auth from './Auth'
import Cart from './Cart';
import Products from './Products';

const rootReducer = combineReducers({
    Auth,Cart,Products
  });

export const store = configureStore({
  reducer: rootReducer
})