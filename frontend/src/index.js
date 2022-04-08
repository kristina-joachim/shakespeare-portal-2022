import { createRoot } from "react-dom/client";
import React from "react";

import App from "./App";
import { Providers } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";
import { BrowserRouter as Router } from "react-router-dom";

Providers.globalProvider = new Msal2Provider({
  clientId: "f1d2663f-3a68-4f72-90c7-c74fd63fa256",
  scopes: ["calendars.read", "user.read", "openid", "profile", "people.read", "user.readbasic.all"],
});

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
