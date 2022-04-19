import { Routes, Route, useLocation } from "react-router-dom";
import GlobalStyles from "./Shared/GlobalStyles";
import Page from "./Page";
import { Login_GetAuthURL, Login_ReturnFromMicrosoft, Login_SignOut } from "./Shared/ExternalLogin";
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
        <Route path="auth/redirect" element={<Login_ReturnFromMicrosoft />} />
        <Route path="auth/signout" element={<Login_SignOut />} />
      </Routes>
    </>
  );
};

export default App;
