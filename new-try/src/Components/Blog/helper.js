import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";


const token = localStorage.getItem("token");

export const FetchData = (path)=>{
    const [data, setData] = useState([]);
    axios.get(`${BASE_URL}/api/${path}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      setData(response.data.posts);
    });
}