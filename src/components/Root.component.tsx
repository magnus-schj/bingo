import { collection } from "firebase/firestore";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Typography from "@mui/material/Typography";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import FormWrapper from "./FormWrapper/FormWrapper.component";

interface Props {}

const Root: FC<Props> = () => {
  // history from react-router-dom
  const navigate = useNavigate();
  // get all games
  const ref = collection(useFirestore(), "games");
  const { data } = useFirestoreCollectionData(ref);
  return (
    <div>
      <FormWrapper>
        <Typography variant="h2" color="initial">
          Velg fra lista
        </Typography>
        <List
          sx={{
            width: "100%",
            background: "#dbdddc",
          }}
        >
          <nav aria-label="game">
            {data &&
              data.map(({ NO_ID_FIELD, name }, i) => (
                <div key={NO_ID_FIELD}>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemButton
                      onClick={() => navigate(NO_ID_FIELD)}
                      sx={{ padding: "1rem" }}
                    >
                      <ListItemText primary={name} />
                    </ListItemButton>
                  </ListItem>
                  {i != data.length - 1 && <Divider />}
                </div>
              ))}
          </nav>
        </List>
      </FormWrapper>
    </div>
  );
};

export default Root;
