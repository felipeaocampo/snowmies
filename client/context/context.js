import { createContext } from 'react';

const default 

const Store = createContext();

export const Provider = ({ children }) => {
  

  return (
    <Store.Provider
      value={{
        user: {},
        addToFoodList,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Store;
