"use client";

import {
  _getAccount,
  _getContractVoting,
  _getEventsProposals,
  _getEventsVoters,
  _getterFuncVoting,
} from "queries/voting-query";
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
  voters: [],

  owner: null,
  workflowStatus: null,
  voting: null,
  proposals: [],
  error: null,
};

export const doWeb3Owner = async (dispatch) => {
  dispatch({ status: "pending" });
  let owner = await _getterFuncVoting("owner");
  try {
    dispatch({ owner, status: "idle", error: null });
  } catch (error) {
    dispatch({ status: "error", error: "Error : Get Owner" });
  }
};

export const doWeb3Whitelist = async (dispatch) => {
  dispatch({ status: "pending" });
  let voters = await _getEventsVoters();
  try {
    dispatch({ voters, status: "idle", error: null });
  } catch (error) {
    dispatch({ status: "error", error: "Error : Get Whitelist" });
  }
};

export const doWeb3Proposal = async (dispatch) => {
  dispatch({ status: "pending" });
  let proposals = await _getEventsProposals();

  try {
    dispatch({ proposals, status: "idle", error: null });
  } catch (error) {
    dispatch({ status: "error", error: "Error : Get Proposals" });
  }
};

export const doWeb3WorkflowStatus = async (dispatch) => {
  dispatch({ status: "pending" });
  let workflowStatus = await _getterFuncVoting("workflowStatus");
  try {
    dispatch({ workflowStatus, status: "idle", error: null });
  } catch (error) {
    dispatch({ status: "error", error: "Error : Get Workflow Status" });
  }
};

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
