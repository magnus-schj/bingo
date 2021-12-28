import { Card, Typography, TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { FC } from "react";
import { useForm } from "../customHooks";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";
import FormWrapper from "./FormWrapper/FormWrapper.component";

interface Props {}

const SignIn: FC<Props> = () => {
  const initialState = { email: "", password: "" };
  const [values, handleChange, setValues] = useForm(initialState);

  return (
    <FormWrapper>
      <Typography variant="h3" color="initial">
        Logg inn
      </Typography>
      <div className="base-container">
        <TextField
          variant="filled"
          // values
          id="email"
          label="epost"
          name="email"
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
      </div>
      <Button
        variant="contained"
        onClick={() =>
          signInWithEmailAndPassword(auth, values.email, values.password)
        }
      >
        Logg inn
      </Button>

      <Button
        variant="contained"
        onClick={() => signInWithGoogle()}
        sx={{
          background: "hsl(5, 69%, 54%)",
          ":hover": {
            background: "hsl(30,90%,60%)",
          },
        }}
      >
        Fortsett med Google
      </Button>
      <Typography variant="subtitle1" color="initial">
        Det kommer mer senere...
      </Typography>
    </FormWrapper>
  );
};

export default SignIn;
