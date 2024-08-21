"use client";
import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import SuccessDialog from "../common/SuccessDialog";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setTimeout(() => {
      if (email !== "") {
        router.push("/login");
        setDialog(true);
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
        {dialog && (
          <SuccessDialog
            dialogTitle="Password reset link sent! Check your email."
            handleClose={() => setDialog(false)}
            dialogOpen={dialog}
          />
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
