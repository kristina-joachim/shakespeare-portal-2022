import usePersistedState from "../hooks/usePersistedState.hook";
const { createContext, useState } = require("react");

const MyContext = createContext(null);

const MyProvider = ({ children }) => {
  const [apiRes, setApiRes] = useState({});
  const [currUser, setCurrUser] = useState(null);
  const [redirect, setRedirect] = usePersistedState("", "redirect");

  return (
    <>
      <MyContext.Provider
        value={{
          states: { apiRes, setApiRes, redirect, setRedirect },
          user: { currUser, setCurrUser },
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export { MyContext, MyProvider };
