import React, { createContext, useReducer, ReactNode } from 'react';
import { reducer, initState } from './reducer';

interface GlobalProviderProps {
  children: ReactNode;
}
export const GlobalContext = createContext({});

export const GlobalProvider = ({
  children,
}: GlobalProviderProps): JSX.Element => {
  const [weatherState, weatherDispatch] = useReducer(reducer, initState);
  const weatherObject: {
    weatherState: Record<string, unknown>;
    weatherDispatch: Function;
  } = {
    weatherState,
    weatherDispatch,
  };

  return (
    <GlobalContext.Provider value={weatherObject}>
      {children}
    </GlobalContext.Provider>
  );
};
