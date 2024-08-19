"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Rating,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import { addToCart } from "@/app/services/actions/action";
interface Product {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
}
export default function ProductDetails() {
  const [product, setProduct] = useState<Product>([]);
  const params = useParams();
  const { productId } = params;
  const dispatch = useDispatch();

  const fetchProduct = useCallback(async () => {
    try {
      let { data } = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      console.log("fetchProduct", data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [productId, fetchProduct]);

  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Image
                src={product?.image}
                alt={product?.title}
                width={500}
                height={500}
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product?.title}
            </Typography>
            <Rating value={4} readOnly precision={0.5} />
            <Typography variant="h6" color="primary" gutterBottom>
              ${product?.price?.toFixed(2)}
            </Typography>
            <Typography variant="body1" paragraph>
              {product?.description}
            </Typography>
            <Typography variant="body1" paragraph>
              {product?.category}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}
