import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./Shared/GlobalStyles";
import { Login_GetAuthURL, Login_ReturnFromMicrosoft, Login_SignOut } from "./Shared/ExternalLogin";
import Class from "./Class";
import Dashboard from "./Dashboard/Dashboard";
import Layout from "./Shared/Layout";
import LandingPage from "./Dashboard/LandingPage";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/classes/">
            <Route path=":classID" element={<Class />} />
          </Route>
        </Route>

        {/* Login Process links */}
        <Route path="auth/signin" element={<Login_GetAuthURL /> /* eslint-disable-line react/jsx-pascal-case */} />
        <Route path="auth/redirect" element={<Login_ReturnFromMicrosoft />} />
        <Route path="auth/signout" element={<Login_SignOut />} />
      </Routes>
    </>
  );
};

export default App;
