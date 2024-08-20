"use client";
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {
  Link,
  Grid,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, ErrorMessage } from "formik";

const theme = createTheme();
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot be longer than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, setSubmitting) => {
              try {
                let response = await axios.post(
                  "https://fakestoreapi.com/auth/login",
                  {
                    username: values?.username,
                    password: values?.password,
                  }
                );
                console.log("login response", response);
                if (response.status === 200) {
                  localStorage.setItem("authToken", response.data.token);
                  router.push("/");
                }
              } catch (error: any) {
                setError("Invalid username or password");
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    value={values.username}
                    error={touched.username && !!errors.username}
                    helperText={<ErrorMessage name="username" />}
                    onChange={handleChange}
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    error={touched.password && !!errors.password}
                    helperText={<ErrorMessage name="password" />}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  {error && <Typography color="error.main">{error}</Typography>}
                  <Grid container>
                    <Grid item xs>
                      <Link href="/forgot-password" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
