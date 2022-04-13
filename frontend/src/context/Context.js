import usePersistedState from "../hooks/usePersistedState.hook";
const { createContext, useState } = require("react");

const MyContext = createContext(null);

const MyProvider = ({ children }) => {
  const [apiRes, setApiRes] = useState({});
  const [currUser, setCurrUser] = useState(null);
  const [loggedIn, setLoggedIn] = usePersistedState("local", "userID", false);

  return (
    <>
      <MyContext.Provider
        value={{
          states: { apiRes, setApiRes, loggedIn, setLoggedIn },
          user: { currUser, setCurrUser },
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export { MyContext, MyProvider };
