import { createRoot } from "react-dom/client";
import React from "react";

import App from "./components/App";
import { Providers } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { MyProvider } from "./context/Context";

Providers.globalProvider = new Msal2Provider({
  clientId: "f1d2663f-3a68-4f72-90c7-c74fd63fa256",
  scopes: ["calendars.read", "user.read", "openid", "profile", "people.read", "user.readbasic.all"],
});

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MyProvider>
      <Router>
        <App />
      </Router>
    </MyProvider>
  </React.StrictMode>
);
