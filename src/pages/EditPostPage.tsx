import { Button,Stack, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/userContext";
import { mutate } from "swr";
import { useRecoilState} from "recoil";
import { postState, valueState } from "../atom/postAtom";
import useMyPosts from "../hooks/useMyPosts";
interface InputForm {
  title: string;
  description: string;
}

export default function EditPost() {
  const {postId} = useParams()
  const navigate = useNavigate();
  const [value, setValue] = useRecoilState(valueState)
  const {userData} = useContext(UserContext)
  const { fetchedMyPosts} = useMyPosts();
  const [post, setPost] = useRecoilState(postState)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: post.title,
      description: post.description,
    },
  });

  
  const onSubmit: SubmitHandler<InputForm> = (data) => {
    const promise = axios.patch(`/update-post/${postId}`,data, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
    promise
      .then((res) => {
        console.log(res.data);
        setValue(1)
        alert("Post Edited");
        mutate(`/get-posts?page=1&filter=`)
        navigate('/posts/user')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ContainerEditPost>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Post</h1>
        <img src={post.image} alt="" />
          <Controller
            name="title"
            control={control}
            render={({ field }) => <TextField {...field}  label="title" />}
          />
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField multiline={true} {...field}  label="description" />}
          />
        </div>
        <Stack direction="row" spacing={2}>
          <Button sx={{ width: "30px" }} type="submit">
            Edit
          </Button>
          <Button sx={{ width: "30px" }} color="error" onClick={() => navigate("/posts/user")}>
            Cancel
          </Button>
        </Stack>
      </form>
    </ContainerEditPost>
  );
}

const ContainerEditPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  img {
    margin-bottom: 15px;
    width: 180px;
    height: 120px;
    background-color: black;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    div {
      display: flex;
      margin-bottom: 5px;
      margin-right: 3px;
      width: 100%;
    }
    h1 {
      margin-bottom: 10px;
      font-size: 30px;
    }
    p {
      color: black;
    }
    a {
      text-decoration: none;
      color: #1976d2;
    }
  }
`;
