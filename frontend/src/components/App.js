import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./Shared/GlobalStyles";
import Page from "./Page";
import Redirect from "./Shared/Redirect";
import { Login_GetAuthURL, Login_GoToMicrosoft, Login_ReturnFromMicrosoft } from "./Shared/ExternalLogin";
import Header from "./Shared/Header";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Page />} />
        {/* Login Process links */}
        <Route path="auth/signin" element={<Login_GetAuthURL />} />
        <Route path="https://login.microsoftonline.com/common/*" element={<Login_GoToMicrosoft />} />
        <Route path="auth/redirect" element={<Login_ReturnFromMicrosoft />} />

        {/* External links */}
        <Route path="cal/*" element={<Redirect type="server" />} />
      </Routes>
    </>
  );
};

export default App;
