import { useContext, useEffect } from "react";
import { ACTIONS } from "./constants";
import { MyContext } from "../../context/Context";
import Loading from "./Loading";
const { useSearchParams, useNavigate } = require("react-router-dom");

const Login_GetAuthURL = () => {
  const {
    state: { authURL },
    actions: { dispatchAction },
  } = useContext(MyContext);

  //User clicked sign in button. Fetch Auth URL from server
  useEffect(() => {
    console.log("Getting AUTH URL");
    //Login Initiated. Get authURL from server
    dispatchAction(ACTIONS.LOGIN_INITIALIZED);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //Got authURL, redirect
    if (authURL != null) window.location.replace(authURL);
  }, [authURL]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Loading />
    </>
  );
};

//User completed login externally, get results.
const Login_ReturnFromMicrosoft = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const goTo = useNavigate();
  const {
    state: { authToken },
    actions: { dispatchAction },
    other: { setLoggedIn },
  } = useContext(MyContext);

  useEffect(() => {
    //Got code from user login, getting token.
    dispatchAction(ACTIONS.LOGIN_VALIDATED, { code: searchParams.get("code") });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (authToken != null) {
      setLoggedIn(authToken.account.homeAccountId);
      goTo("/");
    }
  }, [authToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Loading />
    </>
  );
};

const Login_SignOut = () => {
  const {
    state: { status },
    actions: { dispatchAction },
    other: { setLoggedIn },
  } = useContext(MyContext);

  const goTo = useNavigate();

  //User clicked sign out button. Clear state
  useEffect(() => {
    console.log("Signin Out");
    //Logout initiated, clear session data
    dispatchAction(ACTIONS.LOGIN_LOGOUT);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //User logged out.
    if (status === ACTIONS.LOGIN_LOGOUT) {
      setLoggedIn(false);
      goTo("/");
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Loading />
    </>
  );
};

export { Login_GetAuthURL, Login_ReturnFromMicrosoft, Login_SignOut };
