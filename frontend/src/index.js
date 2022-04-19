import { createRoot } from "react-dom/client";
import React from "react";

import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { MyProvider } from "./context/Context";

const root = createRoot(document.getElementById("root"));

root.render(
  <MyProvider>
    <Router>
      <App />
    </Router>
  </MyProvider>
);
