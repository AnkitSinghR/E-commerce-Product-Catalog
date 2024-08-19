"use client";
import React from "react";
import { Container, Typography, Grid, Box, Paper } from "@mui/material";

const Profile = () => {
  // Example user data (this should be fetched from an API in a real application)
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "2024-08-15",
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Name:</Typography>
              <Typography variant="body1">{user.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Email:</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Joined Date:</Typography>
              <Typography variant="body1">{user.joinedDate}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
