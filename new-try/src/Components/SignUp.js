import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "./Constants";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const FeildChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
 
    await axios
      .post(
        `${BASE_URL}/api/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((res) => {
        Swal.fire({
          text: res.data.status,
          icon: "success",
        });
        setData(e.target.reset());
      });
  };

  return (
    <Stack
      sx={{
        marginTop: "70px",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fef9f8",
      }}
    >
      <Card sx={{ marginTop: "30px ", padding: "80px", bgcolor: "#fef9f8" }}>
        <Stack
          sx={{
            marginBottom: "120px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5"> Sign Up here... </Typography>
        </Stack>

        <Grid container spacing={2}>
          <form onSubmit={handleSubmit}>
            <Grid item sm={12} md={12} lg={12}>
              <TextField
                label="Name"
                name="name"
                type="text"
                sx={{ width: { xs: "100%", sm: "100%", md: "400px" } }}
                onChange={FeildChange}
              />
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <TextField
                id="standard-basic"
                label="Email"
                name="email"
                type="email"
                sx={{
                  width: { xs: "100%", sm: "100%", md: "400px" },
                  marginTop: "15px",
                }}
                onChange={FeildChange}
              />
            </Grid>

            <Grid item sm={12} md={12} lg={12}>
              <TextField
                id="standard-basic"
                label="Password"
                name="password"
                type="password"
                sx={{
                  width: { xs: "200px", sm: "300px", md: "400px" },
                  marginTop: "15px",
                }}
                onChange={FeildChange}
              />
            </Grid>

            <Button
              variant="outlined"
              sx={{ marginTop: "40px", bgcolor: "#FFE3E1", color: "black" }}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Grid>
      </Card>
    </Stack>
  );
};

export default SignUp;
