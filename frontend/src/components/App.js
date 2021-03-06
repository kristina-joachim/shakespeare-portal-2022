import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MyContext } from "../context/Context";
import { ACTIONS } from "./Shared/constants";
import { Login_GetAuthURL, Login_ReturnFromMicrosoft, Login_SignOut } from "./Shared/ExternalLogin";
import GlobalStyles from "./Shared/GlobalStyles";
import Class from "./Class";
import Classes from "./Class/Classes";

import Dashboard from "./Dashboard/Dashboard";
import Layout from "./Shared/Layout";
import LandingPage from "./Dashboard/LandingPage";
import Error from "./Shared/Error";
import Timesheets from "./Timesheets/Timesheets";
import FullCalendar from "./Calendar/FullCalendar";
import { clearStoredData } from "../hooks/usePersistedState.hook";

const App = () => {
  const {
    state: { status, currUser },
    other: { myStatus },
  } = useContext(MyContext);
  const myLoc = useLocation();
  const goTo = useNavigate();
  const [loginTimeout, setLoginTimeout] = useState(null);

  //REDIRECT IF NECESSARY
  useEffect(() => {
    //console.log(`STATUS > @ ${myLoc.pathname} >>  context: ${status} - storage ${myStatus} - currUser ${currUser != null}`);

    if (status === "anonymous") {
      //Start 5s timeout to authenticate
      switch (myStatus) {
        case "anonynous":
          goTo("/");
          break;
        case ACTIONS.LOGIN_INITIALIZED:
          /*         setLoginTimeout(
            setTimeout(() => {
              //timeout. reset storage
              if (myStatus === ACTIONS.LOGIN_INITIALIZED && status === "anonymous") clearStoredData("local", "status");
            }, 10000)
          ); */
          break;
        case ACTIONS.LOGIN_VALIDATED:
          goTo("/auth/signin");
        default:
          //all good~ remove timeout
          //if (loginTimeout != null) setLoginTimeout(null);
          break;
      }
    }
    //error?
    else if (status === ACTIONS.ERROR) goTo("/error");
    else if (status === ACTIONS.LOGIN_INITIALIZED || status === ACTIONS.LOGIN_VALIDATED) goTo("/home");
  }, [status, myStatus]);

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/error" element={<Error />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/calendar" element={<FullCalendar />} />

          <Route path="/classes/">
            <Route path=":classID" element={<Class />} />
            <Route index element={<Classes />} />
          </Route>
          <Route path="/timesheets" element={<Timesheets />} />
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
