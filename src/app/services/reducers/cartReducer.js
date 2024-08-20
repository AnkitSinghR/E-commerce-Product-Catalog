"use client";
import { ADD_TO_CART, REMOVE_TO_CART } from "../constants";
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, { cartData: action.payload }];
    case REMOVE_TO_CART:
      state = state.filter(
        ({ cartData }) => cartData.id !== action.payload.cartData?.id
      );
      return [...state];
    default:
      return state;
  }
};
export default cartReducer;
