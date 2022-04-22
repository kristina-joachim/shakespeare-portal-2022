import usePersistedState, { clearStoredData } from "../hooks/usePersistedState.hook";
import { ACTIONS, URLS } from "../components/Shared/constants";
import { generateURL } from "../components/Shared/utils";
const { createContext, useState, useReducer, useEffect } = require("react");

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
    case ACTIONS.GET_MAILBOX:
      tempState.mailbox = action.res;
      break;
    case ACTIONS.GET_EVENT_DETAILS:
      tempState.selectedClass = action.res;
      break;
    case ACTIONS.ERROR:
      tempState.status = action.type;
      tempState.error = { attemptedAction: action.attemptedAction, ...action.data };
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
  const [myStatus, setStatus] = usePersistedState("local", "status", "anonymous");

  useEffect(() => {
    if (!(state.status === "anonymous" && myStatus === ACTIONS.LOGIN_INITIALIZED)) {
      if (!(state.status === "anonymous" && myStatus === ACTIONS.LOGIN_VALIDATED)) {
        if (state.status === ACTIONS.LOGIN_LOGOUT) clearStoredData("local", "status");
        else setStatus(state.status);
      }
    }
  }, [state.status]);

  //data = { id, fetchOptions}
  const dispatchAction = async (action, data = {}) => {
    //console.log(`%cDispatching ${action} with data:`, "color: purple", data);
    //does action have a URL for server requests?

    if (URLS[action]) {
      //get action endpoint
      let url = URLS[action];
      //console.log(`%c${action} has url: ${url} of `, "color: purple", URLS);

      //add any params needed
      url = generateURL(url, data);

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
        dispatch({ type: ACTIONS.ERROR, data: serverData, attemptedAction: action });
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
    //Get first batch of data
    let results = await fetch(url, options);
    let resJson = await results.json();

    //Paginated API data?
    if (Object.keys(resJson).includes("@odata.context")) {
      const data = [];
      let total = 0;
      let cnt = 1;

      //add Data to array
      if (resJson.value && resJson["@odata.nextLink"]) {
        data.push(...resJson.value);
        total = resJson["@odata.count"];
        console.log(`Fetch #${cnt} - Got ${data.length} items. ${data.length}/${total}........${(data.length / total) * 100}%`);

        // More data? Fetch again
        while (resJson["@odata.nextLink"]) {
          results = await fetch(resJson["@odata.nextLink"], options);
          resJson = await results.json();
          data.push(...resJson.value);
          cnt++;
          console.log(`Fetch #${cnt} - Got ${resJson.value.length} items. ${data.length}/${total}........${(data.length / total) * 100}%`);
        }
        //complete?
        if (data.length !== total) console.log("%cwtf..", "color:red");
        return data;
      } else return resJson;
    } else return resJson;
  };

  return (
    <>
      <MyContext.Provider
        value={{
          state,
          actions: { getServerData, dispatchAction },
          server: { serverResponse, setServerResponse },
          other: { myStatus },
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export { MyContext, MyProvider };
