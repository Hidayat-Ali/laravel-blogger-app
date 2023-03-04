import React from "react";
import {
  Typography,
  Stack,
  CardContent,
  Card,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { Email, Google } from "@mui/icons-material";
import { useState } from "react";
import { BASE_URL } from "./Constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token , setToken] = useState('');
  const [isLoggedIn , setIsLoggedIn] = useState(false);
 

  const navigate = useNavigate();

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
     
        setToken(res.data.access_token);
        setIsLoggedIn(true)
        localStorage.setItem('token',res.data.access_token);
        localStorage.setItem('user_id',res.data.user_id);
        Swal.fire({
          text: res.data.status,
          icon: "success",
        });
        
      })
      .catch((err) => 
      Swal.fire({
        text: 'userame or password is wrong',
        icon: "error",
      })
      
      );
  };


   if (isLoggedIn  && token){
    navigate('/')
   }
  return (
    <Stack
      sx={{ marginTop: "70px", justifyContent: "center", alignItems: "center" }}
    >
      <Typography variant="h5"> Login here... </Typography>

      <Card sx={{ marginTop: "15px ", padding: "150px", bgcolor: "#fef9f8" }}>
        <CardContent>
          <Grid container spacing={5}>
            <form onSubmit={handleLogin}>
              <Grid item sm={12} md={6} lg={6}>
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  value={email}
                  name="email"
                  type="email"
                  sx= {{  width: {  xs: "100%", sm: "100%", md: "400px"}  }}
                  onChange={handleEmail}
                />
                <br />
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  value={password}
                  name="password"
                  type="password"
                  onChange={handlePassword}
                  sx= {{  width: {  xs: "100%", sm: "300px", md: "400px"}  }}
                />
                <br />
                <Button
                  variant="outlined"
                  sx={{ marginTop: "40px", bgcolor: "#FFE3E1", color: "black" }}
                  type="submit"
                >
                  Sign In
                </Button>
              </Grid>

              <Grid item sm={12} md={6} lg={6}>
                
                <Button
                  variant="contained"
                  startIcon={<Google />}
                  sx={{ marginTop: "35px", bgcolor: "#FFE3E1", color: "blue" ,paddingTop:'1px',paddingRight:'45px',paddingLeft:'45px',paddingBottom:'0px',fontSize:'12px',color:'black'
                
                , width: {  xs: "100%", sm: "100%", md: "400px"}
                
                }}
             
                >
                  SignIn with google
                </Button>
              </Grid>
            </form>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Login;
