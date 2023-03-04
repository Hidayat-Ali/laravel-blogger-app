import React, { useEffect, useState } from "react";
import { lightTheme } from "../themes/light";
import { darkTheme } from "../themes/dark";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { LightMode, ModeNight } from "@mui/icons-material";
import { Box } from "@mui/material";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  
  };
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDarkMode ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
      <Box className= 'theme-toggler' onClick = {toggleTheme} >
        {theme==='light'? <LightMode/>:<ModeNight/>}
      </Box>
    </StyledThemeProvider>
  );
};
