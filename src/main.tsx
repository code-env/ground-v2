import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App.tsx";
import ModeToggle from "./components/shared/mode-toggle.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Toaster />
        <App />
        <ModeToggle />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
