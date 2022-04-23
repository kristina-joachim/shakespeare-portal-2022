import { useState, useEffect } from "react";

//
const getStoredData = (type, key, fallbackValue) => {
  //Check for saved data, otherwise return fallback
  let storedValue = type === "local" ? localStorage.getItem(key) : sessionStorage.getItem(key);
  let parsedValue = JSON.parse(storedValue);

  //Compare stored and fallback
  let result = parsedValue != null ? parsedValue : fallbackValue;

  return result;
};

//Save amount of cookies to sessionStorage
const usePersistedState = (type, key, value) => {
  //Check for existing data in Storage
  const newData = getStoredData(type, key, value);

  //Create a state to track data
  //State will be equal to provided value or sessionStorage value
  const [storedData, setStoredData] = useState(newData);

  //Update value in Session storage on state change
  useEffect(() => {
    //console.debug(`Update storage status for ${key}`, storedData);
    type === "local" ? localStorage.setItem(key, JSON.stringify(storedData)) : sessionStorage.setItem(key, JSON.stringify(storedData));
  }, [storedData]); //eslint-disable-line react-hooks/exhaustive-deps

  //Return useState()
  return [storedData, setStoredData];
};

export const clearStoredData = (type, key) => {
  if (type === "local") localStorage.removeItem(key);
  else sessionStorage.removeItem(key);
};

export default usePersistedState;
