import usePersistedState from "../hooks/usePersistedState.hook";
import { ACTIONS, URLS } from "../components/Shared/constants";
const { createContext, useState, useReducer } = require("react");

const MyContext = createContext(null);

const initialState = {
  status: "anonymous",
  authToken: null,
  authURL: null,
  currUser: null,
  calendars: null,
  events: null,
};

const myReducer = (state, action) => {
  console.log("Reducer > action", action);
  let tempState = state;

  console.log("tempState", tempState);
  console.log("action.type", action.type);

  switch (action.type) {
    case ACTIONS.LOGIN_INITIALIZED:
      tempState.status = action.type;
      tempState.authURL = action.data;
      break;
    case ACTIONS.LOGIN_VALIDATED:
      tempState.status = action.type;
      tempState.authToken = action.data.authToken;
      tempState.currUser = action.data.user;
      tempState.calendars = action.data.calendars;
      tempState.events = action.data.events;
      tempState.mainSchedule = action.data.mainSchedule;
      break;
    case ACTIONS.LOGIN_LOGOUT:
      for (const x of Object.keys(tempState)) {
        if (x === "status") tempState[x] = action.type;
        else tempState[x] = null;
      }
      console.log("REDUCER > Updating state to", tempState);
      break;
    default:
      console.error("Unknown action.type", action.type);
      break;
  }
  console.log("Leaving reducer", tempState);
  return { ...tempState };
};

const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myReducer, initialState);
  const [serverResponse, setServerResponse] = useState(null);
  const [loggedIn, setLoggedIn] = usePersistedState("local", "userID", false);

  //data = { id, fetchOptions}
  const dispatchAction = async (action, data = {}) => {
    //console.log(`%cDispatching ${action} with data:`, "color: purple", data);
    //does action have a URL for server requests?

    if (URLS[action]) {
      //get action endpoint
      let url = URLS[action];
      //console.log(`%c${action} has url: ${url} of `, "color: purple", URLS);

      let urlParts = url.split("?");
      //If has search Params, add from data
      if (urlParts.length > 1) {
        let searchParams = urlParts[1]; // param=&param=
        searchParams.split("&").forEach((searchParam) => {
          url = url.replace(searchParam, searchParam + "=" + data[searchParam]);
        });
      }

      //Path includes params?
      let path = urlParts[0];
      if (path.includes(":")) {
        let pathParams = path.split("/").filter((urlPart) => {
          return urlPart.includes(":");
        }); //  auth  redirect  :team  :user >>>  :team  :user

        pathParams.forEach((pathParam) => {
          let param = pathParam.replace(":", "");
          url = url.replace(pathParam, data[param]);
        });
      }

      console.log("URL", url);

      //fetchOPtions?
      let options = data.fetchOptions || {};
      //console.log("FETCH options", options);

      const serverData = await getServerData(url, options);
      //console.log(`Got data from ${url}`, serverData);

      setServerResponse({
        type: action,
        data: serverData.data,
        res: serverData,
      });

      //on error, dispatch error event
      if (serverData.error) {
        dispatch({ type: ACTIONS.error, data: serverData, attemptedAction: action });
      } else dispatch({ type: action, data: serverData.data, res: serverData });
      console.log("%cDISPATCH complete > server", "color: green", serverData);
      return serverData;
    } else {
      //no server data needed? regular dispatch
      dispatch({ type: action, data });
      //console.log("%cDISPATCH complete > state", "color: green", state);
      return data;
    }
  };

  const getServerData = async (url, options) => {
    return await fetch(url, options)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.log("%cFETCH ERROR", "color: red", err);
        return { status: "error", err };
      })
      .finally((result) => result);
  };

  return (
    <>
      <MyContext.Provider
        value={{
          state,
          actions: { getServerData, dispatchAction },
          server: { serverResponse, setServerResponse },
          other: { loggedIn, setLoggedIn },
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export { MyContext, MyProvider };
