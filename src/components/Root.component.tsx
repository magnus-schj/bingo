import { collection, doc } from "firebase/firestore";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import Typography from "@mui/material/Typography";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import FormWrapper from "./FormWrapper/FormWrapper.component";
import { auth } from "../firebase/firebase.utils";

interface Props {}

const Root: FC<Props> = () => {
  if (!auth.currentUser) return null;
  // theme hook
  const theme = useTheme();
  // history from react-router-dom
  const navigate = useNavigate();
  // ! firebase
  // user data
  const userRef = doc(useFirestore(), "users", auth.currentUser.uid);
  const userRes = useFirestoreDocData(userRef);
  // get all games
  const ref = collection(useFirestore(), "games");
  const { data } = useFirestoreCollectionData(ref);
  return userRes.data.vertified ? (
    <div>
      <FormWrapper>
        <Typography variant="h2" color="initial">
          Velg fra lista
        </Typography>
        <List
          sx={{
            width: "100%",
            background: theme.palette.background.paper,
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
  ) : (
    <div>
      Sorry, du er ikke verifisert enda, send meg melding så fikser jeg det!
    </div>
  );
};

export default Root;
