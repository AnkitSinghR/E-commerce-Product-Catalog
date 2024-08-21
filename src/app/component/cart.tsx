"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { removeToCart } from "../services/actions/action";
import WithAuth from "./WithAuth";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state?.cartItem);

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      {cartData?.length !== 0 ? (
        <Grid container spacing={4}>
          {cartData?.map((product: any, index: number) => (
            <Grid item key={product.id} xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.cartData?.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.cartData?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.cartData.description}
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary">
                    {product.cartData.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => dispatch(removeToCart(product))}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
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

export default WithAuth(Cart);
