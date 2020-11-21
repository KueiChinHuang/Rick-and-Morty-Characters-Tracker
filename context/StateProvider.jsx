import React, { createContext, useContext, useReducer } from "react";

// Prepare the dataLayer
export const StateContext = createContext();

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);

// Wrap our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};
