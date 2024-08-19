"use client";
import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { removeToCart } from "../services/actions/action";
interface CartType {
  cartData: any;
}

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.cartItem);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {cartData?.length !== 0 ? (
        <Grid container spacing={2}>
          {cartData?.map((item: any, index: number) => (
            <Grid item key={item.id} xs={12} sm={12} md={12}>
              <Box key={index} sx={{ mt: 4 }}>
                <Box height="medium" width="medium">
                  <Image
                    src={item?.cartData?.image}
                    width={400}
                    height={400}
                    alt="Products"
                  />
                </Box>
                <Box width="300px" gap="small">
                  <Typography variant="h6">{item?.cartData?.title}</Typography>
                  <Typography variant="body1">
                    {item.cartData.description}
                  </Typography>
                  <Typography>Price: ${item?.cartData?.price}</Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => dispatch(removeToCart(item))}
                >
                  Remove to Cart
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box height="500px">
          <h1 style={{ textAlign: "center" }}>Your cart is empty.</h1>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
