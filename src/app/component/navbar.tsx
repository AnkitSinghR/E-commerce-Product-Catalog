"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SuccessDialog from "./common/SuccessDialog";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Products", href: "/products" },
  { text: "Cart", href: "/cart" },
  { text: "Profile", href: "/profile" },
];

const Navbar = () => {
  const pathName = usePathname();
  const [dialog, setDialog] = useState(false);

  const quantity = useSelector((state: any) => state.cartItem.length);
  const onLogoutClick = () => {
    localStorage?.clear();
    setDialog(true);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-commerce Product Catalog
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Link key={item.text} href={item.href} passHref legacyBehavior>
              <Button color={pathName === item.href ? "secondary" : "inherit"}>
                {item.text === "Cart" ? `${item.text} ${quantity}` : item.text}
              </Button>
            </Link>
          ))}
          <Link href="/login" passHref>
            <Button
              color={pathName === "/login" ? "secondary" : "inherit"}
              onClick={onLogoutClick}
            >
              Logout
            </Button>
          </Link>
        </Box>
      </Toolbar>
      {dialog && (
        <SuccessDialog
          dialogTitle="Logged Out Successfully"
          dialogOpen={dialog}
          handleClose={() => setDialog(false)}
        />
      )}
    </AppBar>
  );
};

export default Navbar;
