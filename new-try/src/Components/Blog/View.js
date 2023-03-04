import {
  Stack,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  CardMedia,
  Grid,
  Button,
  Divider,
  Container,
  Box,
  styled,
  Link,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants";
import dateFormat from "dateformat";
import Swal from "sweetalert2";
import Comment from "../Blog/Comment";

const View = () => {
  const { id } = useParams();
  
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [commentsShow, setCommentsShow] = useState([]);
  const DeleteButton = styled(Button)({
    background: "#FFE3E1",
    marginRight: "15px",
    marginTop: "15px",
    color: "black",
  });

  const EditButton = styled(Button)({
    background: "#FFE3E1",
    margin: "auto",
    marginTop: "15px",
    color: "black",
  });

  // handle delete post

  const DeletePost = async (id) => {
    await axios
      .get(`${BASE_URL}/api/delete-post/${id}`, {
        headers: {
          Authorization: "Bearer" + token,
        },
      })
      .then((response) => {
        Swal.fire({
          text: response.data.status,
          icon: "success",
        });
        navigate("/");
      });
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/post-one/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((post) => {
        setPost(post.data.post);
        setUser(post.data.user);
      });
  }, [id]);

 

  useEffect(() => {

   
    axios.get(`${BASE_URL}/api/comments/${id}`,{
      headers: {
        Authorization: "Bearer" + token,
      },
    })
    
    .then((res)=>{
      setCommentsShow(res.data.comments)
    })
  }, [])
  console.log(commentsShow);

  return (
    <Stack sx={{ marginTop: "100px",width:'100%'}}>
      <Grid container >
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ padding: "auto" }}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: "#FFF8E1",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                  aria-label="recipe"
                >
                  {user.name?.substring(0, 1)}
                </Avatar>
              }
              title={post.title}
              subheader={
                `posted on:` + dateFormat(post.created_at, "mmmm dS, yyyy")
              }
            />
            <CardMedia
              component="img"
              sx={{
                objectFit: "contain",
              }}
              image={
                post.image
                  ? `${BASE_URL}/uploads/${post.image}`
                  : `${BASE_URL}/uploads/nothing-image.jpg`
              }
              alt="this is design copy here"
            />
            <CardContent
              sx={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></CardContent>
            Posted By :{" "}
            <Typography
              sx={{ fontStyle: "italic", marginLeft: "80px", color: "grey" }}
              variant="subtitle1"
            >
              {" "}
              {user?.name}{" "}
            </Typography>
          </Card>

          {user_id == post.user_id ? (
            <Card
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Container>
                <Stack sx={{ justifyContent: "center", textAlign: "center" }}>
                  <Divider>
                    <Typography variant="h5">Actions</Typography>
                  </Divider>
                </Stack>
                <DeleteButton
                  variant="contained"
                  onClick={() => DeletePost(post.id)}
                >
                  Delete
                </DeleteButton>

                <EditButton variant="contained" sx={{ marginTop: "15px" }}>
                  <Link
                    id={post.id}
                    onClick={() => navigate(`/update/${post.id}`)}
                  >
                    Edit
                  </Link>
                </EditButton>
              </Container>
            </Card>
          ) : (
            ""
          )}
        </Grid>
        <Container sx={{ marginTop: "100px" }}>
          <Typography variant="h6" color="initial"> all comments below</Typography>
          <Card
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              height: 300,
              overflow: "hidden",
              overflowY: "scroll",
              width:{lg:'500px',md:'400px',sm:'300px'},
              bgcolor:'#fef9f8',
              marginBottom:'12px'

              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
          >
             {
              commentsShow?.map((userComment)=>(
            <Box sx={{background:'#FFE3E1',borderRadius:'30px' ,justifyContent:'center',alignItems:'center',marginTop:'15px'}}>
           
        
            <Chip size="small"  avatar={<Avatar sx={{color:'black',background:'#FFE3E1'}}>{userComment.user.name.substring(0,1).toUpperCase()}</Avatar>} label={userComment.user.name}/> 
            
            <Typography variant="subtitle1" sx={{textIndent:'44px',margin:'auto'}}>{userComment?.comment}</Typography>
    
            
            
            </Box>
              ))
            }
          </Card>
        </Container>

        <Container sx={{ marginTop: "90px" }}>
          <Comment user={user} post={post} />
        </Container>
      </Grid>
    </Stack>
  );
};

export default View;
