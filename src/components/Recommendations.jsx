import styled from "styled-components";
import React from 'react'
import { useState , useEffect } from "react";
import axios from "axios";
import Card from "./Card";
const Container=styled.div`
  flex:2;
`;
export const Recommendations = ({tags,currentVideoId}) => {
  const [videos,setVideos]=useState([]);
  useEffect(()=>{
    const fetchVideos = async ()=>{
      const res = await axios.get(`/api/videos/tags?tags=${tags}`)
      setVideos(res.data);
      console.log(tags);
    }

    fetchVideos();
  },[tags])
  // console.log("dfdsa")
  return (
    <Container>
        {
          videos.map((video)=>(
            video._id !== currentVideoId && <Card type="sm" key ={video._id} video={video}/>
          ))
        }

    </Container>
  )
}
