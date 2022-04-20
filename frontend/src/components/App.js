import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./Shared/GlobalStyles";
import { Login_GetAuthURL, Login_ReturnFromMicrosoft, Login_SignOut } from "./Shared/ExternalLogin";
import Header from "./Shared/Header";
import Class from "./Class";
import Dashboard from "./Dashboard/Dashboard";
import Layout from "./Shared/Layout";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
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
