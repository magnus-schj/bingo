import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAppProvider, FirestoreProvider } from "reactfire";
import App from "./App";
import { store } from "./App/store";
import { firebaseConfig } from "./firebase/firebase.utils";
import { theme } from "./themes";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </FirebaseAppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
