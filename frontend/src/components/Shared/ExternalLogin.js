import { useContext, useEffect } from "react";
import { ACTIONS } from "./constants";
import { MyContext } from "../../context/Context";
import Loading from "./Loading";
const { useSearchParams, useNavigate } = require("react-router-dom");

const Login_GetAuthURL = () => {
  const {
    actions: { dispatchAction },
  } = useContext(MyContext);

  //User clicked sign in button. Fetch Auth URL from server
  useEffect(() => {
    console.log("Getting AUTH URL");
    //Login Initiated. Get authURL from server
    dispatchAction(ACTIONS.LOGIN_INITIALIZED);
    //Server should automatically redirect to <ExternalRoute.js>
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

//Server redirected to AuthURL
const Login_GoToMicrosoft = () => {
  const {
    state: { currUser },
    actions: { dispatchAction },
  } = useContext(MyContext);

  useEffect(() => {
    //while (!currUser.authURL) {}
    dispatchAction(ACTIONS.LOGIN_PROCESSING);
    window.location.replace(currUser.authURL);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Loading />
    </>
  );
};

//User completed login externally, get results.
const Login_ReturnFromMicrosoft = () => {
  const { code } = useSearchParams();
  const goTo = useNavigate();
  const {
    actions: { dispatchAction },
  } = useContext(MyContext);

  useEffect(() => {
    dispatchAction(ACTIONS.LOGIN_VALIDATED, { code });
    //Got code from user login, getting token.
    goTo("/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Loading />
    </>
  );
};

export { Login_GetAuthURL, Login_GoToMicrosoft, Login_ReturnFromMicrosoft };
