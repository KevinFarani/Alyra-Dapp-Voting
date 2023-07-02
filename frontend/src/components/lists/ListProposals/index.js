import { doWeb3Proposal, useWeb3Dispatch, useWeb3State } from "context/web3";
import {
  _getProposals,
  _getterFuncVoting,
  _setterFuncVoting,
} from "queries/voting-query";

import React, { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import { v4 as uuidv4 } from "uuid";

export const ListProposals = () => {
  const { isConnected, address } = useAccount();
  const { workflowStatus, voters } = useWeb3State();
  const dispatch = useWeb3Dispatch();

  const [isInput, setIsInput] = useState("");
  const [isProposals, setIsProposals] = useState([]);

  const handleClick = async () => {
    await _setterFuncVoting("addProposal", [isInput]);
    doWeb3Proposal(dispatch);
  };

  const getProposals = async () => {
    setIsProposals(await _getProposals());
  };

  useEffect(() => {
    if (isConnected && voters?.includes(address)) {
      getProposals();
    }
  }, [isConnected]);
  return (
    <div className="overflow-x-auto  w-2/5  ">
      <h1 className="text-white uppercase font-black text-right">
        Proposals List
      </h1>
      <table className="table table-zebra border border-white/10 ">
        {/* head */}
        <thead className="">
          <tr>
            <th>#VoterId</th>
            <th>Address</th>
            <th>Vote</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {voters?.includes?.(address) ? (
            isProposals?.map((el, index) => (
              <tr key={uuidv4()}>
                <th>{el?.id}</th>
                <td className={`${el?.id === address && "text-info"}`}>
                  {el?.proposal?.description}
                </td>
                <td>{parseInt(el?.proposal?.voteCount)}</td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr className="font-black text-white text-center w-full my-4">
              <th>You must be voter to see proposals</th>
            </tr>
          )}
        </tbody>
      </table>
      {workflowStatus === 1 && (
        <div className="flex flex-col mt-5 w-full">
          <textarea
            placeholder={"Add a proposal"}
            value={isInput}
            className="textarea     textarea-bordered w-full  min-h-[10vh]"
            onChange={(e) => setIsInput(e.target.value)}
          ></textarea>
          <button
            className=" btn btn-success btn-sm w-fit ml-auto mt-5 btn-outline"
            onClick={handleClick}
          >
            Add Proposal
          </button>
        </div>
      )}
    </div>
  );
};
