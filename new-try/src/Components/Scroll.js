import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const Scroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    console.log(position)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <Box
        className="scroll-up"
        sx={{ display: scrollPosition > 60 ? "flex" : "none" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
      <ArrowCircleUpIcon/>
      </Box>
   
  );
};

export default Scroll;
