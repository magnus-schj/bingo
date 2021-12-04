import React, { FC } from "react";

import { useForm } from "../customHooks";

import { Card, TextField, Typography, Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.utils";
import { SignUpForm } from "../interfaces";

interface Props {}

const SignUp: FC<Props> = () => {
  const initialState: SignUpForm = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, handleChange] = useForm(initialState);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) return;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("suskess!", user);
    } catch (error) {
      console.log("error creating user:", error);
    }
  };
  return (
    <Card className="form-container">
      <Typography variant="h3" color="initial">
        Registrer deg
      </Typography>
      <form>
        <TextField
          variant="filled"
          // values
          id="email"
          label="epost"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          // values
          id="password"
          label="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          // values
          id="confirmPassword"
          label="Bekreft passord"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default SignUp;
