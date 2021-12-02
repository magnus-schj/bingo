import { Button, TextField } from "@mui/material";
import React, { FC } from "react";
import { useForm } from "../customHooks";

interface Props {}

const SignIn: FC<Props> = () => {
  const initialState = { name: "", password: "" };

  const [values, handleChange, setValues] = useForm(initialState);

  return (
    <div>
      <TextField
        id="name"
        label="name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <TextField
        id="password"
        label="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <Button>Sign in</Button>
    </div>
  );
};

export default SignIn;
