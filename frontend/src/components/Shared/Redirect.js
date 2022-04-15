import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";
import { clearStoredData } from "../../hooks/usePersistedState.hook";
const { useLocation, useNavigate } = require("react-router-dom");

const Redirect = ({ type }) => {
  const myLoc = useLocation();
  const goTo = useNavigate();
  const {
    states: { apiRes, setApiRes, setLoggedIn },
    user: { setCurrUser, setCalendars },
  } = useContext(MyContext);

  const getServerData = async (url, options = {}) => {
    console.log(`%cFetching from ${myLoc.pathname}`, "color: red");
    const response = await fetch(url, options);
    const data = await response.json();
    const tempState = {};
    tempState[myLoc.pathname] = {
      endpoint: myLoc.pathname,
      ...data,
    };
    setApiRes({ ...apiRes, ...tempState });
  };

  useEffect(() => {
    console.log(`${type} redirect from`, myLoc);
    switch (type) {
      case "external":
        console.log("Going External...");
        window.location.replace(myLoc.pathname.substring(1) + myLoc.search);
        break;
      case "server":
        getServerData(myLoc.pathname + myLoc.search);
        break;
      default:
        console.log("Current URL", myLoc);
        break;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (apiRes != null) {
      //console.log("To:", myLoc.pathname + myLoc.search);
      console.log("Server Redirect complete, results:", apiRes);

      const canRedirect = apiRes["/auth/signin"];
      delete apiRes["/auth/signin"];
      if (canRedirect != null && !canRedirect.error && canRedirect.redirectURL != null) {
        console.log("Redirecting to Microsoft for login", canRedirect);
        window.location.replace(canRedirect.redirectURL);
      }

      const gotUser = apiRes["/auth/redirect"];
      delete apiRes["/auth/redirect"];
      if (gotUser && !gotUser.error) {
        const userAccnt = gotUser.data && gotUser.data.authToken.account;
        const userDetails = gotUser.data && gotUser.data.user;
        const userInfo = userAccnt && {
          userID: userAccnt.homeAccountId,
          name: userAccnt.name,
          email: userAccnt.username,
        };
        if (userDetails) {
          userInfo.timezone = userDetails.mailboxSettings.timeZone;
          userInfo.formats = {
            time: userDetails.mailboxSettings.dateFormat,
            date: userDetails.mailboxSettings.timeFormat,
          };
          userInfo.language = {
            name: userDetails.mailboxSettings.language.displayName,
            code: userDetails.mailboxSettings.language.locale,
          };
        }

        console.log("Got User data", userInfo);
        userInfo != null && setCurrUser({ ...userInfo });
        userInfo != null && setLoggedIn(userAccnt.homeAccountId);

        console.log("Redirecting back home");
        goTo("/");
      }

      const userSignOut = apiRes["/auth/signout"];
      delete apiRes["/auth/signout"];
      if (userSignOut && !userSignOut.error) {
        console.log("User logged out", userSignOut);
        setCurrUser(null);
        clearStoredData("local", "userID");
        console.log("Redirecting back home");
        goTo("/");
      }

      const calendars = apiRes["/cal/all"];
      delete apiRes["/cal/all"];
      if (calendars) setCalendars(calendars.data);
    }
  }, [apiRes]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default Redirect;
