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
  Input,
} from "@mui/material";
import React from "react";
import { useState, useRef,useEffect } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { BASE_URL } from "./Constants";
import Swal from "sweetalert2";


const CreatePost = () => {
  const editor = useRef(null);
  // const  [title , setTitle] = useState('');
  // const [content, setContent] = useState("");
  const [post,setPost] = useState({
    title:'',
    content:'',
    category_id: ''
  }
)
  const [categories, setCategories]= useState([]);
  // const [category,setCategory] = useState('');    
  const token = localStorage.getItem('token');
  useEffect(() => {
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
  }, []);
  

  const contentFieldChanaged= (data)=>{
  setPost({...post, 'content':data})
  }
  const handleSubmit= async()=>{
    const token = localStorage.getItem('token');
    // if(post.title.trim()=== " "){
    //   Swal.fire({
    //     text:'title is missing !',
    //     icon: 'error'
    //   })
    // }
  
    // if(post.content.trim()=== " "){
    //   Swal.fire({
    //     text:'content is missing !',s
    //     icon: 'error'
    //   })
    // }
    
    await axios.post(`${BASE_URL}/api/insert-post`,
       {
        title:post.title,
        content:post.content,
        category_id:post.category_id
      },
     {  headers:{
       Authorization:`Bearer ${token}`
      }
      }
  
  )
  .then((res)=>{
    Swal.fire({
      text:res.data.status,
      icon: 'success'
    })
    setPost('')
  }
  )
  .catch((err)=>console.log(err))


}

const feildChanged =(event)=>{
  // event.preventDefault();
  setPost({ ...post, [event.target.name]: event.target.value })
}

  const ButtonStyled = styled(Button)({
    background: "#FFE3E1",
    marginTop: "15px",
    color: "black",
  });

  return (
    <Container
      sx={{
        marginTop: "100px",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Grid container spacing={5}>
        <Card sx={{ padding: "40px", margin: "auto" }}>
          <Grid item lg={12}>
            <TextField
              label="Title"
              variant="standard"
              sx={{ width: { xs: "100%", sm: "100%", md: "400px" } }}
              name="title"
              onChange= {feildChanged}
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
                onChange={feildChanged}
              >
              
                {
                  categories.map((category)=>(
                    <MenuItem  value={category.id} name='category_id' key={category.id}>{category.title}</MenuItem>
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
    <Divider/>
          <Grid item >
           
        <InputLabel sx={{ marginTop: "30px" }}>Upload Image * </InputLabel>
        <Input type="file" name ="image"/>
          </Grid>
          <Grid item>
            <ButtonStyled variant="contained" onClick={()=>handleSubmit()}>Submit</ButtonStyled>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default CreatePost;
