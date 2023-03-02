import React, { useCallback, useEffect } from 'react';
import { createContext, useState } from 'react';

const store = createContext();

export const Provider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [mountainData, setMountainData] = useState({});
  const [signUpClicked, setSignUpClicked] = useState(false);

  const handleUserDataUpdate = useCallback((data) => {
    setUserData(data);
  }, []);

  const handleMountainDataUpdate = useCallback((data) => {
    // console.log(`SECOND MTN DATA`, data);
    setMountainData(data);
  }, []);

  const fetchMountainData = useCallback(async (homeMountain) => {
    const response = await fetch(`/api/mountains/name/${homeMountain}`);
    const data = await response.json();

    // console.log(`FIRST MTN DATA`, data);

    setMountainData(data);
  }, []);

  useEffect(() => {
    if (userData.status === `success`) {
      fetchMountainData(userData.data.homeMountain);
    }
    // console.log(`inside useEffect but outside fetch`); RUNS ON INIT,
  }, [userData]);

  const resetStoreData = useCallback(() => {
    setUserData({});
    setMountainData({});
    setSignUpClicked(false);
  }, []);

  return (
    <store.Provider
      value={{
        userData,
        handleUserDataUpdate,
        handleMountainDataUpdate,
        mountainData,
        signUpClicked,
        setSignUpClicked,
        resetStoreData,
      }}
    >
      {children}
    </store.Provider>
  );
};

export default store;
