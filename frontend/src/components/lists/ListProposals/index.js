import { doWeb3Proposal, useWeb3Dispatch, useWeb3State } from "context/web3";
import { _setterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const ListProposals = () => {
  const [isInput, setIsInput] = useState("");
  const { isConnected, address } = useAccount();
  const { proposals } = useWeb3State();
  const dispatch = useWeb3Dispatch();
  const handleClick = async () => {
    const tx = await _setterFuncVoting("addProposal", [isInput]);
    doWeb3Proposal(dispatch);
    console.log("tx", tx);
  };

  useEffect(() => {
    if (isConnected) {
    }
  }, [isConnected]);
  return (
    <div className="overflow-x-auto rounded-2xl  ">
      <div className="join">
        <div className="relative">
          <textarea
            placeholder={"Add a proposal"}
            value={isInput}
            className="textarea    textarea-bordered  textarea-xs w-full max-w-xs"
            onChange={(e) => setIsInput(e.target.value)}
          ></textarea>
        </div>
        <button className="join-item btn" onClick={handleClick}>
          +
        </button>
      </div>
      <table className="table shadows ">
        {/* head */}
        <thead className="bg-zinc-600">
          <tr>
            <th>#VoterId</th>
            <th>Address</th>
            <th>Vote</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {proposals?.map((voter, index) => (
            <tr
              key={voter}
              className={`${index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-900"}`}
            >
              {console.log("test", proposals)}
              <th>{index}</th>
              <td className={`${voter === address && "text-info"}`}>{voter}</td>
              <td>Waiting start ...</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
