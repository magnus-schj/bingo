import { useState, ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "./App/hookts";
import { resetBoard } from "./features/currentUser/currentUser.slice";
import { auth } from "./firebase/firebase.utils";

export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState);
  return [
    values,
    (e: ChangeEvent<HTMLInputElement>) =>
      setValues({ ...values, [e.target.name]: e.target.value }),
    setValues,
  ];
};

export const useLogOutListener = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!auth.currentUser) dispatch(resetBoard());
  }, [auth.currentUser]);
};
