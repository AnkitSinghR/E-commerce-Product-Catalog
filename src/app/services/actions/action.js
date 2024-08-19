"use client";
import { ADD_TO_CART, REMOVE_TO_CART } from "../constants";

export const addToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeToCart = (data) => ({
  type: REMOVE_TO_CART,
  payload: data,
});
