import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "@fontsource/roboto/300.css";

declare module "@mui/material/styles" {
  interface Theme {
    extra: {
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
      col6: string;
      col7: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    extra?: {
      col1?: string;
      col2?: string;
      col3?: string;
      col4?: string;
      col5?: string;
      col6?: string;
      col7: string;
    };
  }
}

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#094436", // taken from logo text
    },
    secondary: {
      main: "#9ab79a", // taken from logo icon
    },
    text: {
      primary: "#0c0c0c",
    },
  },
  extra: {
    col1: "#137f6e",
    col2: "#762f30",
    col3: "#29833d",
    col4: "#397187",
    col5: "#243771",
    col6: "#6c1966",
    col7: "#b1706c",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
