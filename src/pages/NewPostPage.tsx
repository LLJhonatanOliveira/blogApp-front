import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/userContext";
import { mutate } from "swr";
interface InputForm {
  image: string;
  title: string;
  description: string;
  category?: string;
  tag?: string;
}

export default function NewPost() {
  const navigate = useNavigate();
  const {userData} = useContext(UserContext)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      image: "",
      title: "",
      description: "",
      category: "",
      tag: "",
    },
  });

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    console.log(data)
    const promise = axios.post("/create-post",data, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
    promise
      .then((res) => {
        console.log(res.data);
        alert("Post Created");
        mutate(`/get-posts?page=1&filter=`)
        navigate('/posts')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ContainerSignUP>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>New Post</h1>
          <Controller
            name="image"
            control={control}
            render={({ field }) => <TextField {...field} label="URL image" />}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => <TextField {...field} label="title" />}
          />
        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => <TextField label="category" {...field} />}
          />
          <Controller
            name="tag"
            control={control}
            render={({ field }) => <TextField label="tag" {...field} />}
          />
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField multiline={true} {...field}  label="description" />}
          />
        </div>
        <Stack direction="row" spacing={2}>
          <Button sx={{ width: "30px" }} type="submit">
            Create
          </Button>
          <Button sx={{ width: "30px" }} color="error" onClick={() => navigate("/posts")}>
            Cancel
          </Button>
        </Stack>
      </form>
    </ContainerSignUP>
  );
}

const ContainerSignUP = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
