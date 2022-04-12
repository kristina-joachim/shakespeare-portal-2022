const { createContext, useState } = require("react");

const MyContext = createContext(null);

const MyProvider = ({ children }) => {
  const [apiRes, setApiRes] = useState(null);
  const [currUser, setCurrUser] = useState(null);

  return (
    <>
      <MyContext.Provider
        value={{
          api: { apiRes, setApiRes },
          user: { currUser, setCurrUser },
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export { MyContext, MyProvider };
