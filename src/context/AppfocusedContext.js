import React, { useContext, useReducer } from "react";
import { FETCH_COMPONENT_FAILURE, FETCH_COMPONENT_SUCCESS, } from "../reducer/actionTypes";
import { AppfocusedReducer } from "../reducer/AppfocusedReducer";
import { initialState } from '../reducer/initialState'
// service
import AppFocusedService from "../services/appFocusedService";

const appFocusedService = new AppFocusedService();

// using context to have possibility to provide and consume data from state
const AppfocusedContext = React.createContext();
// components which need to work with data will use just this custom hook
export const useAppfocusedContext = () => {
  return useContext(AppfocusedContext);
};

// provide which dispatch all action to reducer
const AppfocusedProvider = ({ children }) => {

  // to manage state of each component
  const [state, dispatch] = useReducer(AppfocusedReducer, initialState);

  const ComponentFailure = (error, component) => {
    dispatch({ type: FETCH_COMPONENT_FAILURE, payload: { error, component } });
  };

  const ComponentLoaded = (data, component) => {
    dispatch({ type: FETCH_COMPONENT_SUCCESS, payload: { data, component } });
  };

  const fetchComponent = (component, query) => {
    appFocusedService
      .getData(query)
      .then((data) => {
        ComponentLoaded(data, component);
      })
      .catch((error) => {
        ComponentFailure(error);
      });
  };

  return (
    <AppfocusedContext.Provider value={{
      state,
      fetchComponent
    }}>
      {children}
    </AppfocusedContext.Provider>
  );
};

export default AppfocusedProvider;
