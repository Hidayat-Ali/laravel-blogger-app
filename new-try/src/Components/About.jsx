import { Stack, Typography, Avatar, Card, CardContent, Container } from "@mui/material";
import React from "react";
import { EmojiPeopleOutlined, PsychologyAlt } from "@mui/icons-material";
import {data} from './Data/data';
 import { ReactComponent as Avatar1 } from '../icons/about.svg';
const About = () => {
const PI = data[0];
  return (
    <Stack>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "70px",
        }}
      >
        <Avatar
          alt="H"
          src="https://images.pexels.com/photos/13952901/pexels-photo-13952901.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          sx={{ width: 250, height: 250 }}
        />
        <Typography variant="h3">
          {PI.who} <PsychologyAlt sx={{ color: "#FFE3E1", fontSize: "50px" }} />{" "}
        </Typography>
      </Stack>
 
      <Card
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "300px", sm: "400px", md: "600px", lg: "800px" },
          margin: "auto",
          boxShadow: "100px,100px,100px,#fef9f8",
          background: "#fef9f8",
          border: "0px",
          marginBottom: "40px",
        }}
      >
        <Container sx={{direction:'row'}}>
   <Avatar1/>
   </Container>
           
              
        <CardContent sx={{ justifyContent: "center", alignItems: "center" }}>
          <Typography gutterBottom variant="h4" sx={{ color: "#FFE3E1" }}>
            Hello ,<EmojiPeopleOutlined sx={{ fontSize: "50px" }} /> {}
          </Typography>


    
          <Typography variant="body2">
         {PI.History}
          </Typography>
        </CardContent>
   
      </Card>
    </Stack>
  );
};

export default About;
