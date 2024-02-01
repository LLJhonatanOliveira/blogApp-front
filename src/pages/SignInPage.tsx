import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../context/userContext";

interface InputForm {
  userName: string;
  password: string;
}

export default function SignIn() {
  const {userData, setUserData} = useContext(UserContext);
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<InputForm>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    const promise = axios.post("/auth/sign-in", data);
    promise
      .then((res) => {
        const { userName, token } = res.data;
        setUserData({ userName, token });
        localStorage.setItem("userData", JSON.stringify({ userName, token }));
        alert("Login successful");
        navigate('/posts')
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  console.log(userData);
  return (
    <ContainerSignUP>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign-In</h1>
        <div>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => <TextField {...field} label="userName" />}
          />
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField type="password" label="password" {...field} />
            )}
          />
        </div>
        <Button sx={{ width: "30px" }} type="submit">
          Submit
        </Button>
        <h2>
          Don't have an account? <Link to={"/sign-up"}>Register!</Link>
        </h2>
      </form>
    </ContainerSignUP>
  );
}

const ContainerSignUP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
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
