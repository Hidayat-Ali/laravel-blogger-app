import { Favorite, MoreVert, Share, Visibility } from "@mui/icons-material";
import {
  Stack,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  CardHeader,
  CardMedia,
  IconButton,
  CardActions,
  Link,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import dateFormat from "dateformat";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
 const [user,setUser]  = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/posts`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        
        setData(response.data.posts);
        setUser(response.data.users)
        setLoading(true);
      })
      .catch((err) => {
        Swal.fire({
          text: "Unauthorised access",
          icon: "warning",
        });
      });
  }, [token]);

  
//   function getText(html){
//     var divContainer= document.createElement("div");
//     divContainer.innerHTML = html;
//     return divContainer.textContent || divContainer.innerText || "";
// }

 console.log(data)
  if (!loading) {
    return (
      <Stack
        sx={{
          marginTop: "100px",
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        <Typography>Loading...</Typography>
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  return (
    <>
      <Stack sx={{ marginTop: "60px" }}>
        <Stack
          sx={{
            marginTop: "14px",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          <Typography variant="h3" color="#0a0a0a">
            {"  Blogs..."}
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {data.map((post) => (
            <Grid item xs={12} sm={12} lg={4} key = {post.id}>
              <Card sx={{ bgcolor: "#fef9f8", mx: "25px" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: "#FFF8E1", color: "black" }}
                      aria-label="recipe"
                    >
                  h
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  }
                  title={post.title}
                  subheader={dateFormat(post.created_at, "mmmm dS, yyyy")}
                />

                <CardMedia
                  component="img"
                 
                  sx={{objectFit:'cover',height:'300px'}}
                  image={post.image? `${BASE_URL}/uploads/${post.image}`:`${BASE_URL}/uploads/nothing-image.jpg`}
                  alt="this is design copy here"
                />
                <CardContent  dangerouslySetInnerHTML={{__html:post.content.substring(0, 300)+'...'}}>
                
                   {/* dangerouslySetInnerHTML={{__html: getText(post.content)}}  */}
               
                </CardContent>
                <CardActions>
                  <IconButton aria-label="share icon">
                    <Share />
                  </IconButton>

                  <IconButton aria-label="favourite">
                    <Favorite />
                  </IconButton>
                  <IconButton>
                    <Link
                      id={post.id}
                      sx={{ textDecoration: "none " }}
                      onClick={() =>
                         Navigate(`/post-view/${post.id}`)
                        
                      }
                    >
                      <Visibility />
                    </Link>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Home;
