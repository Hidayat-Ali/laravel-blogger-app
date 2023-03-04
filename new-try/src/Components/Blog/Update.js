import React,{ useEffect, useRef, useState } from 'react'
import {
    Card,
    Container,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Button,
    styled,
    Stack,

  } from "@mui/material";

import { useParams} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Constants';
import JoditEditor from "jodit-react";
import Swal from 'sweetalert2';


const Update = () => {

    const editor = useRef(null);
    
    const [categories, setCategories]= useState([]);
    const token = localStorage.getItem('token');
    const [post, setPost] = useState({
      title:'',
      content:'',
      category_id:''
      
    });
    const {id} = useParams();
    // console.log(id);
     useEffect(() => {
        axios
        .get(`${BASE_URL}/api/post-one/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setPost(res.data.post);
        });


        axios.get(`${BASE_URL}/api/categories`,{
            headers: {
              Authorization: "Bearer " + token,
            },
           })
           .then((res)=>{
            setCategories(res.data.categories);
           })
           .catch((err)=>{
            console.log(err)
           })

     }, [id])


     const contentFieldChanaged= (content)=>{
     setPost({...post,'content':content})
      }
     const UpdatePost = (id)=>{
       axios.post(`${BASE_URL}/api/update-post/${id}`,
       {
        title:post.title,
        content: post.content,
        category_id:post.category_id
       },
       { 
        headers:{
          Authorization: 'Bearer' + token
        }
      })

      .then((response)=>{
        Swal.fire({
          text:response.data.status,
          icon:'success'
         })
      })
      
     }

     const fieldChanged = (event)=>{
      setPost({...post, [event.target.name]:event.target.value})
     }



     const ButtonStyled = styled(Button)({
        background: "#FFE3E1",
        marginTop: "15px",
        color: "black",
      });
    
     
  return (
   <Stack sx={{marginTop:'100px'}}>
    <Card sx={{ padding: "40px", margin: "auto" }}>
    <Grid item lg={12}>
      <TextField
        label="Title"
        variant="standard"
        sx={{ width: { xs: "100%", sm: "100%", md: "400px" } }}
        value={post.title}
       name = 'title'
       onChange={fieldChanged}
      />
    </Grid>
    <br />
    <Grid item>
      <FormControl
        variant="standard"
        sx={{ m: 1, width: { xs: "100%", sm: "100%", md: "400px" } }}
      >
        <InputLabel id="demo-simple-select-filled-label">
         Choose Category 
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          name = "category_id"
          onChange={fieldChanged}
          hideSelectedOptions={false}

        >
        
          {
            categories.map((category)=>(
              <MenuItem value={category.id} name="category_id">{category.title}</MenuItem>
            ))
          }
       
        
        </Select>
      </FormControl>
    </Grid>
    <Grid item lg={12}>
      <InputLabel
        id="demo-simple-select-filled-label"
        sx={{ marginTop: "30px" }}
      >
        Content *
      </InputLabel>
      <Divider />
      <br />

      <JoditEditor
        ref={editor}
        value={post.content}
        tabIndex={1} // tabIndex of textarea
        onChange={(newContent) => contentFieldChanaged(newContent)}
        sx={{ width: { xs: "100%", sm: "100%", md: "100%" } }}
      />
    </Grid>
    <Grid item>
      <ButtonStyled variant="contained" onClick={()=>UpdatePost(post.id)}>Update</ButtonStyled>
    </Grid>
  </Card>

   </Stack>
  )
}

export default Update
