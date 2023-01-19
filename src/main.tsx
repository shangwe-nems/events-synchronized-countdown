import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/style/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider
    theme={{
      headings: { fontFamily: "Greycliff CF, sans-serif" },
    }}
  >
    <App />
  </MantineProvider>
  // </React.StrictMode>
);
