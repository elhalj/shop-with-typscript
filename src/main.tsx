import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  ArticleContextProvider,
  ThemeContextProvider,
  UserContextProvider,
} from "./context/index.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <BrowserRouter>
    <ThemeContextProvider>
      <UserContextProvider>
        <ArticleContextProvider>
          <App />
        </ArticleContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
  </StrictMode>
);
