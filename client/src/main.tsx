import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AccountContextProvider } from "./context/AccountContext.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountContextProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </AccountContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
