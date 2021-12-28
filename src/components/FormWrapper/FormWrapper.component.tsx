import React, { FC } from "react";
import { Card } from "@mui/material";

import "./FormWrapper.styles.scss";

interface Props {}

const FormWrapper: FC<Props> = ({ children }) => {
  return <Card className="form-wrapper">{children}</Card>;
};

export default FormWrapper;
