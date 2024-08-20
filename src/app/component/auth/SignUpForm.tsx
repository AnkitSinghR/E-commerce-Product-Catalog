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
  Box,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SuccessAlerts from "../common/SuccessAlert";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot be longer than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  firstname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot be longer than 50 characters")
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot be longer than 50 characters")
    .matches(/^[a-zA-Z]+$/, "Last name can only contain letters")
    .required("Last name is required"),
});

const SignUpForm = () => {
  const router = useRouter();
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                "https://fakestoreapi.com/users",
                {
                  email: values.email,
                  username: values.username,
                  password: values.password,
                  name: {
                    firstname: values.firstname,
                    lastname: values.lastname,
                  },
                }
              );
              if (response.status === 200) {
                <SuccessAlerts />;
                router.push("/login");
              }
              console.log("response", response);
            } catch (error) {}
            console.log("values", values);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      label="user Name"
                      variant="outlined"
                      fullWidth
                      value={values.username}
                      onChange={handleChange}
                      error={touched.username && !!errors.username}
                      helperText={<ErrorMessage name="username" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="firstname"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      value={values.firstname}
                      onChange={handleChange}
                      error={touched.firstname && !!errors.firstname}
                      helperText={<ErrorMessage name="firstname" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="lastname"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      value={values.lastname}
                      onChange={handleChange}
                      error={touched.lastname && !!errors.lastname}
                      helperText={<ErrorMessage name="lastname" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && !!errors.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && !!errors.password}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="confirmpassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={values.confirmpassword}
                      onChange={handleChange}
                      error={
                        touched.confirmpassword && !!errors.confirmpassword
                      }
                      helperText={<ErrorMessage name="confirmpassword" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
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
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUpForm;
