"use client";
import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import profile from "@/app/utils/Image/profile.png";
import cart from "@/app/utils/Image/cart.png";

const Navbar = () => {
  const quantity = useSelector((state) => state.cartItem.length);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-commerce Product Catalog
        </Typography>
        <Box>
          <Button color="inherit">
            <Link href="/" passHref>
              <Typography color="inherit">Home</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/products" passHref>
              <Typography color="inherit">Products</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/cart" passHref>
              <Image
                src={cart}
                alt="Profile"
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <Typography
                variant="h6"
                mx={2}
                top="-67px"
                right="-31px"
                position="relative"
              >
                {quantity}
              </Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/profile" passHref>
              <Image
                src={profile}
                alt="Profile"
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
