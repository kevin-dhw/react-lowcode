// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClickToComponent } from "click-to-react-component";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DndProvider backend={HTML5Backend}>
    <ClickToComponent />
    <App />
  </DndProvider>
);
