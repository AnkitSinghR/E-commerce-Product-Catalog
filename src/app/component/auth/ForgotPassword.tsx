"use client";
import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import SuccessAlerts from "../common/SuccessAlert";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setTimeout(() => {
      if (email !== "") {
        setSuccessMessage("Password reset link sent! Check your email.");
        router.push("/login");
        <SuccessAlerts message="Password reset link sent! Check your email." />;
      } else {
        setError("Something went wrong. Please try again.");
      }
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="primary" variant="body2">
              {successMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Send Reset Link
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
