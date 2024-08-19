"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import WithAuth from "@/app/component/WithAuth";

import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Slider,
} from "@mui/material";

interface Product {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
}
interface Category {
  title: string;
  value: string;
}
const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const [category, setCategory] = useState<Category[]>([]);
  const fetchProductList = async () => {
    try {
      let { data } = await axios.get("https://fakestoreapi.com/products");
      let category = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategory(["All", ...category.data]);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchProductList();
  }, []);

  interface Products {}

  useEffect(() => {
    let filtered = products?.filter(
      (product) =>
        product?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
        (selectedCategory ? product?.category === selectedCategory : true) &&
        product?.price >= priceRange[0] &&
        product?.price <= priceRange[1]
    );

    if (sortOption === "priceLowToHigh") {
      filtered = filtered.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered = filtered.sort((a: Product, b: Product) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, sortOption, selectedCategory, priceRange, products]);

  const navigateToProductDetails = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Product Catalog
      </Typography>

      <Box mb={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {category.map((item) => (
                  <MenuItem key={item} value={item === "All" ? "" : item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={100}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => navigateToProductDetails(product)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product?.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {product?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product?.category}
                </Typography>
                <Typography variant="h6">{product?.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WithAuth(ProductCatalog);
