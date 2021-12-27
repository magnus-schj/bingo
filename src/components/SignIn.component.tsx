import { Card, Typography, TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { FC } from "react";
import { useForm } from "../customHooks";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";

interface Props {}

const SignIn: FC<Props> = () => {
  const initialState = { email: "", password: "" };
  const [values, handleChange, setValues] = useForm(initialState);

  return (
    <Card className="form-container">
      <Typography variant="h3" color="initial">
        Logg inn
      </Typography>
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
      <Button
        variant="contained"
        onClick={() =>
          signInWithEmailAndPassword(auth, values.email, values.password)
        }
      >
        Logg inn
      </Button>
      <Button variant="contained" onClick={() => signInWithGoogle()}>
        Fortsett med Google
      </Button>
    </Card>
  );
};

export default SignIn;
