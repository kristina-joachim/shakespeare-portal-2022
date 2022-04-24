import { useContext, useEffect } from "react";
import { ACTIONS, ENDPOINTS } from "./constants";
import { MyContext } from "../../context/Context";
import Loading from "./Loading";
import { generateURL } from "./utils";
import { clearStoredData } from "../../hooks/usePersistedState.hook";
const { useSearchParams, useNavigate } = require("react-router-dom");

const Login_GetAuthURL = () => {
  const {
    state: { authURL },
    actions: { dispatchAction },
  } = useContext(MyContext);

  //User clicked sign in button. Fetch Auth URL from server
  useEffect(() => {
    //console.log("/auth/signin > Getting AUTH URL");
    //Login Initiated. Get authURL from server
    dispatchAction(ACTIONS.LOGIN_INITIALIZED);
  }, []);

  useEffect(() => {
    //Got authURL, redirect
    if (authURL != null) window.location.replace(authURL);
  }, [authURL]);

  return (
    <>
      <Loading />
    </>
  );
};

//User completed login externally, get results.
const Login_ReturnFromMicrosoft = () => {
  let [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line no-unused-vars
  const goTo = useNavigate();
  const {
    state: { authToken },
    actions: { dispatchAction },
    other: { myStatus },
  } = useContext(MyContext);

  useEffect(() => {
    //console.log(`REDIRECT. status ${status} myStatus ${myStatus}`);
    //Got code from user login, getting token.
    if (myStatus === ACTIONS.LOGIN_INITIALIZED) dispatchAction(ACTIONS.LOGIN_VALIDATED, { code: searchParams.get("code") });
    if (myStatus === ACTIONS.LOGIN_LOGOUT) {
      clearStoredData("local", "status");
      goTo("/");
    }
  }, []);

  useEffect(() => {
    //console.log(`REDIRECT. authToken`, authToken);
    if (authToken != null) {
      goTo("/home");
    }
  }, [authToken]);

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
  } = useContext(MyContext);

  //User clicked sign out button. Clear state
  useEffect(() => {
    if (status !== ACTIONS.LOGIN_LOGOUT) {
      //console.log("/auth/signout > Sign Out initiated");
      dispatchAction(ACTIONS.LOGIN_LOGOUT);
    } else {
      // console.log("/auth/signout > Redirecting to MS for logout");
      let url = generateURL(ENDPOINTS.logout.url, { post_logout_redirect_uri: "http://localhost:3000/auth/redirect" });
      window.location.replace(url);
    }
  }, [status]);

  return (
    <>
      <Loading />
    </>
  );
};

export { Login_GetAuthURL, Login_ReturnFromMicrosoft, Login_SignOut };
