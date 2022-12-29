// import React from 'react'
// import styled from 'styled-components';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import app from "../firebase";
// import {
//   getStorage,
//   ref ,
//   uploadBytesResumable,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// const Container = styled.div`

//   width:100%;
//   height:100%;
//   position :absolute;
//   top:0;
//   left:0;
//   background-color:black;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// `;
// const Wrapper = styled.div`
//   height:600px;
//   width:600px;
//   background-color:${({theme})=>theme.bgLighter};
//   color : ${({theme})=>theme.text};
//   padding:20px;
//   display:flex;
//   flex-direction:column;
//   gap:20px;
//   position:relative;
//   `;
  
//   const Close =styled.div`
  
//   position : absolute;
//   top:10px;
//   right:10px;
//   cursor : pointer;
//   `
  
//   const Title =styled.h1`
//   text-align :center;

// `
// const Input = styled.input`
//   border: 1px solid ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.text};
//   border-radius: 3px;
//   padding: 10px;
//   background-color: transparent;
//   z-index: 999;
// `;
// const Desc = styled.textarea`
//   border: 1px solid ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.text};
//   border-radius: 3px;
//   padding: 10px;
//   background-color: transparent;
// `;
// const Button = styled.button`
//   border-radius: 3px;
//   border: none;
//   padding: 10px 20px;
//   font-weight: 500;
//   cursor: pointer;
//   background-color: ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.textSoft};
// `;
// const Label = styled.label`
//   font-size: 14px;
// `;
// const Upload = ({setOpen}) => {
//   const [img, setImg]=useState(undefined);
//   const [video , setVideo]=useState(undefined);
//   const [imgPerc,setImgPerc]=useState(0);
//   const [videoPerc , setVideoPerc]=useState(0);
//   const [title, setTitle ]=useState("");
//   const [desc , setDesc]=useState("");
//   const [tags,setTags]=useState([]);
//   const [inputs, setInputs] = useState({});
//   const handleTags=(e)=>{
//     setTags(e.target.value.split(','))
//   }
//   const uploadFile =(file,urlType)=>{
//     const storage = getStorage();
//     const fileName = String(new Date().getTime() + file?.name);
//     const storageRef =ref(storage, fileName);
//     // console.log(console.log(fileName))
//     // const storageRef = ref(storage, 'some-child');


//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//           default:
//             break;
//         }
//       },
//       (error) => {},
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setInputs((prev) => {
//             return { ...prev, [urlType]: downloadURL };
//           });
//         });
//       }
//     );
//   }
//   useEffect(()=>{video && uploadFile(video,"videoUrl")},[video]);
//   useEffect(()=>{img && uploadFile(img,"imageUrl")},[img])
//   return (
//     <Container>
//       <Wrapper>
//           <Close onClick={()=>{setOpen(false);console.log("hello")}}>X</Close>
//           <Title>Upload a video</Title>
//           <Label>Video : </Label>
//           <Input type ="file" accept="video/*" onChange={(e)=>setVideo(e.target.files[0])}/>
//           <Input type ="text" placeholder='title' onChange={e=>setTitle(e.target.value)}/>
//           <Desc placeholder='Description' row={8} onChange={e=>setDesc(e.target.value)}/>
//           <Input type ="text" placeholder='seperate the tags with commas' onClick={handleTags}/>
//           <Label>Image</Label>
//           <Input type ="file" accept="image/*" onChange={(e)=>setImg(e.target.files[0])}/>
//           <Button>Upload</Button>
//       </Wrapper>
//     </Container>
//   )
// }

// export default Upload;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import Axios from "../config";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    
    setTags(e.target.value.split(","));
    console.log(tags);
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
    console.log(video);
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    const res = await Axios.post("/api/videos", {...inputs, tags})
    setOpen(false)
    res.status===200 && navigate(`/api/video/${res.data._id}`)
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;