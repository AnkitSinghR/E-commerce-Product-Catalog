"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import WithAuth from "./WithAuth";
import { Container, Typography, Grid, Box, Paper } from "@mui/material";
interface User {
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
}
const Profile = () => {
  const [user, setUser] = useState<User>({
    email: "",
    username: "",
    name: {
      firstname: "",
      lastname: "",
    },
  });
  const getUserList = async () => {
    const username = localStorage?.getItem("username");
    const { data } = await axios.get("https://fakestoreapi.com/users");
    const userDetails = data.filter(
      (item: any) => item.username === username
    )[0];
    setUser(userDetails);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Userame:</Typography>
              <Typography variant="body1">{user.username}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Name:</Typography>
              <Typography variant="body1">{`${user.name.firstname} ${user.name.lastname}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Email:</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default WithAuth(Profile);
