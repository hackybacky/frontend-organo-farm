import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  // width:300px;
  // height:300px;
  gap: 10px;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Button = styled.button`
  width: 200px;
  height: 40px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.bgLighter};
  letter-spacing: 0.07em;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const currentUser = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);
  const addComment = async () => {
    const res = await axios.post("/api/comments", { desc: newComment, videoId });
    console.log(res);
  };
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          onChange={(e) => {
            setNewComment(e.target.value);
            console.log(newComment);
          }}
        />
        <Button onClick={addComment}>Add Comment</Button>
      </NewComment>
      <Hr />
      {comments.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
    </Container>
  );
};

export default Comments;
