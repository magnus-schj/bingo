import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import HomeIcon from "@material-ui/icons/Home";
import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.utils";

interface Props {}

const NavBar: FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const noRootUrl = location.pathname != "/";

  const handleClick = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          {noRootUrl && (
            <IconButton onClick={() => navigate("/")}>
              <HomeIcon />
            </IconButton>
          )}
        </div>

        <Button variant="contained" color="warning" onClick={handleClick}>
          Logg ut
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
