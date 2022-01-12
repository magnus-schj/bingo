import React, { FC } from "react";
import { useAppSelector } from "../App/hookts";
import SignedIn from "./SignedIn/SignedIn.component";
import SignInAndSignUp from "./SignInAndSignUp/SignInAndSignUp.component";

interface Props {}

const Root: FC<Props> = () => {
  const currentUserSlice = useAppSelector((state) => state.currentUser);
  return currentUserSlice.userInfo ? <SignedIn /> : <SignInAndSignUp />;
};

export default Root;
