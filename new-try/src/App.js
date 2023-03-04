import React from "react";
import './App.css';
import NavBar from "./Components/NavBar";
import { Stack } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import CreatePost from "./Components/CreatePost";
import Footer from "./Components/Footer";
import View from "./Components/Blog/View";
import Update from "./Components/Blog/Update";
import SignUp from "./Components/SignUp";
import { useTheme } from 'styled-components';
import Scroll from "./Components/Scroll";
const App = () => {
  const theme = useTheme();
  return (
    <Stack bgcolor={theme.background} >
     

      <BrowserRouter>
     
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post-view/:id" element={<View />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path ="/Sign-up" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
      <Scroll/>
      <Footer/>
    </Stack>
  );
};

export default App;
