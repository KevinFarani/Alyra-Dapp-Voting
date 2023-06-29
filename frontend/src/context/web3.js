"use client";

import { _getAccount, _getContractVoting } from "queries/voting-query";
import { createContext, useContext, useReducer } from "react";

// Mise en place du reducer Web3
const reducer = (currentState, newState) => {
  return { ...currentState, ...newState };
};

// Création des context pour state & dispatch
export const Web3StateContext = createContext();
export const Web3DispatchContext = createContext();

const initialState = {
  status: "idle",
  voting: null,
  proposals: null,
  error: null,
};

// export const doWeb3ContractVoting = async (dispatch) => {
//   dispatch({ status: "pending" });
//   let voting = await _getContractVoting();
//   try {
//     dispatch({ voting, status: "idle", error: null });
//   } catch (error) {
//     dispatch({ status: "error", error: "Error : Get ContractVoting" });
//   }
// };

// Mise à disposition des fonctions à réutiliser dans les components
export const useWeb3State = () => {
  const context = useContext(Web3StateContext);
  if (!context) throw new Error("useWeb3State must be used in Web3Provider");
  return context;
};
export const useWeb3Dispatch = () => {
  const context = useContext(Web3DispatchContext);
  if (!context) throw new Error("useWeb3Dispatch must be used in Web3Provider");
  return context;
};

// Mise en place du Provider de l'App
export const Web3Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Web3StateContext.Provider value={state}>
      <Web3DispatchContext.Provider value={dispatch}>
        {props.children}
      </Web3DispatchContext.Provider>
    </Web3StateContext.Provider>
  );
};
