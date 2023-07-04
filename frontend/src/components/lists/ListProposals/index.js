import {
  doWeb3Proposal,
  doWeb3Whitelist,
  useWeb3Dispatch,
  useWeb3State,
} from "context/web3";
import {
  _getProposals,
  _getVoter,
  _getterFuncVoting,
  _setterFuncVoting,
} from "queries/voting-query";

import React, { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import { v4 as uuidv4 } from "uuid";

export const ListProposals = () => {
  const { isConnected, address } = useAccount();
  const { workflowStatus, proposals, voters, owner } = useWeb3State();
  const dispatch = useWeb3Dispatch();

  const [isInput, setIsInput] = useState("");
  const [isVoted, setIsVoted] = useState(false);

  const handleProposal = async () => {
    await _setterFuncVoting("addProposal", [isInput]);
    doWeb3Proposal(dispatch);
  };

  const handleVote = async (id) => {
    await _setterFuncVoting("setVote", [id]);
    doWeb3Whitelist(dispatch);
    doWeb3Proposal(dispatch);
  };

  const doIsVote = async () => {
    const voter = await _getVoter(address);
    setIsVoted(voter?.hasVoted);
  };

  useEffect(() => {
    let access = false;
    voters.find((e) => (e.address === address ? (access = true) : null));

    if (isConnected && access) {
      doIsVote();
    }
  }, [address, proposals]);

  return (
    <div className="overflow-x-auto  w-2/5  ">
      <h1 className="text-white uppercase font-black text-right">
        Proposals List
      </h1>
      <table className="table border border-white/10 ">
        {/* head */}
        <thead className="text-accent">
          <tr>
            <th>#ProposalId</th>
            <th>Description</th>
            <th>Vote(s)</th>
            <th></th>
          </tr>
        </thead>
        {workflowStatus >= 1 && (
          <tbody>
            {voters?.find((e) => e.address === address) || owner === address ? (
              proposals?.map((el, index) => (
                <tr key={uuidv4()}
                    className={`${index % 2 === 0 ? "bg-base-100 text-zinc-900" : "bg-zinc-900 text-base-100"}`}
                >
                  <th>{el?.id}</th>
                  <td className={`${el?.id === address && "text-info"}`}>
                    {el?.proposal?.description}
                  </td>
                  <td>
                    {voters?.find((e) => e.address === address)
                      ? parseInt(el?.proposal?.voteCount)
                      : "Only voter can see proposals"}
                  </td>
                  <td className=" flex justify-end">
                    {!isVoted && workflowStatus === 3 && (
                      <button
                        className="ml-auto btn btn-outline btn-success btn-xs"
                        onClick={() => handleVote(el?.id)}
                      >
                        Vote
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="font-black text-white text-center w-full my-4">
                <th>You must be voter to see proposals</th>
              </tr>
            )}
          </tbody>
        )}
      </table>
      {workflowStatus === 1 && voters?.find((e) => e.address === address) && (
        <div className="flex flex-col mt-5 w-full">
          <textarea
            placeholder={"Add a proposal"}
            value={isInput}
            className="textarea     textarea-bordered w-full  min-h-[10vh]"
            onChange={(e) => setIsInput(e.target.value)}
          ></textarea>
          <button
            className=" btn btn-success btn-sm w-fit ml-auto mt-5 btn-outline"
            onClick={handleProposal}
          >
            Add Proposal
          </button>
        </div>
      )}
    </div>
  );
};
