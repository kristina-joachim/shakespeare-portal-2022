import { useState, useEffect } from "react";

//
const getSessionData = (key, fallbackValue) => {
  //Check for saved data, otherwise return fallback
  // console.log(`getSessionData(key: ${key}, fallbackValue: ${fallbackValue})`);
  let storedValue = sessionStorage.getItem(key);
  let parsedValue = JSON.parse(storedValue);

  // console.log(`SessionStorage(stored:${storedValue}, parsed: ${parsedValue})`);

  //Compare stored and fallback
  let result = parsedValue != null ? parsedValue : fallbackValue;

  // console.log(`${fallbackValue} OR ${parsedValue} = ${result}`);
  return result;
};

//Save amount of cookies to sessionStorage
const usePersistedState = (value, key) => {
  //Check for existing data in sessionStorage
  let newData = getSessionData(key, value);

  //Create a state to track data
  //State will be equal to provided value or sessionStorage value
  const [sessionData, setSessionData] = useState(newData);

  //Update value in Session storage on state change
  useEffect(() => {
    console.log(`Update storage status for ${key}`, sessionData);
    sessionStorage.setItem(key, JSON.stringify(sessionData));
  }, [sessionData]); //eslint-disable-line react-hooks/exhaustive-deps

  //Return useState()
  return [sessionData, setSessionData];
};

export const clearSessionData = (key) => {
  sessionStorage.removeItem(key);
};

export default usePersistedState;
