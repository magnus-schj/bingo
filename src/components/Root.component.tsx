import { collection } from "firebase/firestore";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {}

const Root: FC<Props> = () => {
  // get all games
  const ref = collection(useFirestore(), "games");
  const { data } = useFirestoreCollectionData(ref);
  return (
    <div>
      <Typography variant="h2" color="initial">
        Velg fra lista
      </Typography>
      {data &&
        data.map(({ NO_ID_FIELD, name }) => (
          <Link key={NO_ID_FIELD} to={NO_ID_FIELD}>
            <Button variant="contained" color="primary">
              {name}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default Root;
