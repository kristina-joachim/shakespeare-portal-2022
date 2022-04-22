import { Routes, Route, useNavigate } from "react-router-dom";
import GlobalStyles from "./Shared/GlobalStyles";
import { Login_GetAuthURL, Login_ReturnFromMicrosoft, Login_SignOut } from "./Shared/ExternalLogin";
import Class from "./Class";
import Dashboard from "./Dashboard/Dashboard";
import Layout from "./Shared/Layout";
import LandingPage from "./Dashboard/LandingPage";
import { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";

const App = () => {
  const {
    other: { loggedIn },
  } = useContext(MyContext);
  const goTo = useNavigate();

  useEffect(() => {
    console.log("Logged in ?");
    if (!loggedIn) goTo("/");
  }, []);

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
        <Route path="auth/signin" element={<Login_GetAuthURL />} />
        <Route path="auth/redirect" element={<Login_ReturnFromMicrosoft />} />
        <Route path="auth/signout" element={<Login_SignOut />} />
      </Routes>
    </>
  );
};

export default App;
