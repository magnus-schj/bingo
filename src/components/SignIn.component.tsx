import { Card, Typography, TextField, Button } from "@mui/material";
import React, { FC } from "react";
import { useForm } from "../customHooks";
import { signInWithGoogle } from "../firebase/firebase.utils";

interface Props {}

const SignIn: FC<Props> = () => {
  const initialState = { name: "", password: "" };
  const [values, handleChange, setValues] = useForm(initialState);
  return (
    <Card className="form-container">
      <Typography variant="h3" color="initial">
        Logg inn
      </Typography>
      <TextField
        variant="filled"
        // values
        id="name"
        label="navn"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        // values
        id="password"
        label="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <Button variant="contained">Logg inn</Button>
      <Button variant="contained" onClick={() => signInWithGoogle()}>
        Fortsett med Google
      </Button>
    </Card>
  );
};

export default SignIn;
