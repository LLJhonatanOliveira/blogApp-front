import {
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link} from "react-router-dom";
import styled from "styled-components";
interface InputForm {
  firstName: string;
  lastName: string;
  userName: string;
  birth: string;
  password: string;
  sex: GenderEnum | string;
}
enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
export default function SignUp() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      birth: "",
      password: "",
      sex: "",
    },
  });

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    const promise = axios.post('/auth/sign-up', data)
    promise.then((res) => {
      console.log(res.data)
      alert("Account created");
      
    })
    .catch((error) => {
      console.log(error.message)
    })
  };
  return (
    <ContainerSignUP>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign-Up</h1>
        <div>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <TextField {...field} label="First Name" />}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <TextField {...field} label="Last Name" />}
          />
        </div>
        <div>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => <TextField {...field} label="Username" />}
          />
        </div>
        <div>
          <Controller
            name="birth"
            control={control}
            render={({ field }) => (
              <TextField
                type="date"
                label="Birthday"
                InputLabelProps={{ shrink: true }}
                {...field}
              />
            )}
          />
         
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            )}
          />
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField type="password" label="Password" {...field} />
            )}
          />
        </div>
        <Button sx={{ width: "30px" }} type="submit">
          Submit
        </Button>
        <h2>Already have an account? <Link to={"/sign-in"}>Sign-in!</Link></h2>
        
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
    p{
        color: black;
    }
    a{
        text-decoration: none;
        color:#1976d2
      }
  }
`;
