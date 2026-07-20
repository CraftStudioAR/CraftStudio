import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import SmoothScroll from "./components/SmoothScroll.tsx";
import CustomCursor from "./components/CustomCursor.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SmoothScroll>
      <CustomCursor />
      <div className="grain-overlay" />
      <App />
    </SmoothScroll>
  </BrowserRouter>,
);
