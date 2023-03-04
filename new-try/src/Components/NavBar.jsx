import {
  Box,
  styled,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Button,
  Link,
} from "@mui/material";

import React, { useState } from "react";
import {
  Facebook,
  GitHub,
  Instagram,
  Menu as MenuIcon,
  Search,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "./Constants";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

const NavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const MenuItems = [
    { Name: "Home", path: "/" },
    { Name: "About", path: "/about" },
    { Name: "Login", path: "/login" },
    { Name: "Create", path: "/Create" },
    { Name: "Sign Up", path: "/Sign-Up" },
  ];

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    //  await axios.post(`${BASE_URL}/api/logout`)
    // .then((res)=>console.log(res))
    localStorage.removeItem("token");
    Swal.fire({
      text: "log out successfuly",
      icon: "success",
    });
    navigate("/login");
  };

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    background:'#fef9f8',
    color: theme.text,
  });

  const SocialMediaBox = styled(Box)({
    display: "flex",
    gap: 10,
  });

  const MenuBox = styled(Box)({
    display: "flex",
    gap: 30,
  });
  const SearchBox = styled(Box)({
    display: "flex",
    gap: 2,
  });
  const ButtonBox = styled(Button)({
    borderRadius: "50px",
    width: "340px",
    background: "#FFE3E1",
    color: "black",
  });

  const ButtonLogOut = styled(Button)({
    color: theme.text,
    background: theme.background,
    borderRadius: "50px",
    fontSize: "10px",
  });

  return (
    <AppBar bgcolor={theme.background}>
      <StyledToolbar>
        <SocialMediaBox>
          <Facebook />
          <Instagram />
          <GitHub />
        </SocialMediaBox>
        <MenuBox
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        >
          {MenuItems.map((item) => (
            <Typography>
              <Link
                href={item.path}
                sx={{ textDecoration: "none", color: theme.text }}
                key={item.Name}
              >
                {item.Name === "Login" && token ? "" : item.Name}
              </Link>
            </Typography>
          ))}
          {token ? (
            <ButtonLogOut variant="outlined">
              <Link
                sx={{ textDecoration: "none", color: theme.text }}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </ButtonLogOut>
          ) : (
            ""
          )}
        </MenuBox>
        <SearchBox>
          <InputBase placeholder="search..."  color= {theme.text}/>
          <Search />
          <MenuIcon
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
            }}
            onClick={() => setOpen(!open)}
          />
        </SearchBox>
      </StyledToolbar>
      <Menu
        open={open}
        onClose={() => setOpen(!open)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Box sx={{ width: 250, height: "95vh", bgcolor: "#fef9f8" }}>
          {MenuItems.map((item) => (
            <MenuItem>
              <ButtonBox variant="outlined">
                <Link
                  href={item.path}
                  sx={{ textDecoration: "none", color: theme.text }}
                  key={item.Name}
                >
                  {(item.Name === "Login" && token ? "" : item.Name) ||
                    (item.Name === "Create" && !token ? "" : item.Name)}
                </Link>
              </ButtonBox>
            </MenuItem>
          ))}
          <MenuItem>
            {token ? (
              <ButtonBox variant="outlined" onClick={handleLogout}>
                Logout
              </ButtonBox>
            ) : (
              ""
            )}
          </MenuItem>
        </Box>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
