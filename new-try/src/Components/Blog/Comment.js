import {
  TextField,
  Stack,
  Typography,
  Grid,
  Card,
  Paper,
  Button,
  styled,
  InputLabel,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import Swal from "sweetalert2";
import { BASE_URL } from "../Constants";

const Comment = ({ user, post }) => {
  // console.log(user,post)
  const CommentButton = styled(Button)({
    marginLeft: "22px",
    marginTop: "22px",
    background: " #FFE3E1",
    color: "black",
  });
  const [comment, setComment] = useState("");

  function handleEmojiText(text) {
    setComment(text);
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!comment == "") {
      await axios
        .post(
          `${BASE_URL}/api/comment`,
          {
            comment: comment,
            user_id: user.id,
            post_id: post.id,
          },
          {
            headers: {
              Authorization: `Bearer  ${token}`,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            text: res.data.status,
            icon: "success",
            iconColor: "green",
            color: "green",
          });
          setComment("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Stack>
      <Typography
        variant="h5"
        sx={{ marginTop: "15px", marginBottom: "25px", marginLeft: "50px" }}
      >
        {" Write your comment below "}
      </Typography>

      <Grid container spacing={3}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Container>
            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
              <InputEmoji
                onChange={handleEmojiText}
                placeholder="Type a message"
                sx={{ marginBottom: "19px" }}
              />
            </Stack>
            <CommentButton variant="contained" onClick={() => handleSubmit()}>
              Send
            </CommentButton>
          </Container>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Comment;
