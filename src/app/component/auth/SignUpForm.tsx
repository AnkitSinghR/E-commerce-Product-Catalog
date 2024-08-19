"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Alert,
  Stack,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import SuccessAlerts from "../common/SuccessAlert";

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const response = await axios.post("https://fakestoreapi.com/users", {
        email: formData.email,
        username: formData.username,
        password: formData,
        name: {
          firstname: formData.firstname,
          lastname: formData,
        },
      });
      if (response.status === 200) {
        <SuccessAlerts message="Signed Up Successfully" />;
        router.push("/login");
      }
      console.log("response", response);
    } catch (error) {}
    console.log("Form data:", formData);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="username"
              label="user Name"
              variant="outlined"
              fullWidth
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="firstname"
              label="First Name"
              variant="outlined"
              fullWidth
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="lastname"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Link href="/register" variant="body2">
              {"have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUpForm;
