import React, { FC } from "react";
import { SignUpForm } from "../interfaces";
import { useForm } from "../customHooks";
import "../baseStyles.scss";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

import { Card, TextField, Typography, Button } from "@mui/material";
import FormWrapper from "./FormWrapper/FormWrapper.component";
interface Props {}

const SignUp: FC<Props> = () => {
  const initialState: SignUpForm = {
    displayName: "",
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
      const { displayName } = values;
      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.log("error creating user:", error);
    }
  };
  return (
    <FormWrapper>
      <Typography variant="h3" color="initial">
        Registrer deg
      </Typography>
      <div className="base-container">
        <TextField
          variant="filled"
          // values
          id="displayName"
          label="Navn"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          // values
          id="email"
          label="Epost"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />

        <TextField
          variant="filled"
          // values
          id="password"
          label="Passord"
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
      </div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Submit
      </Button>
    </FormWrapper>
  );
};

export default SignUp;
