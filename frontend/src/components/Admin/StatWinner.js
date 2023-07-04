import { useWeb3State } from "context/web3";
import { _getterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";

export const StatWinner = () => {
  const [isWinner, setIsWinner] = useState(null);
  let [isScore, setIsScore] = useState(null);
  const { proposals, voters, workflowStatus } = useWeb3State();

  const getWinner = async () => {
    const winnerId = parseInt(await _getterFuncVoting("winningProposalID"));
    const winnerProposal = proposals?.[winnerId];
    if (parseInt(winnerProposal?.proposal?.voteCount) > 0) {
      setIsWinner(winnerProposal);
    }
  };

  const getResult = () => {
    let totalVotes = 0;
    for (let index = 0; index < proposals.length; index++) {
      const element = proposals[index];
      totalVotes += parseInt(element?.proposal?.voteCount);
    }
    setIsScore(
      Math.floor((parseInt(isWinner?.proposal?.voteCount) / totalVotes) * 100)
    );
  };

  useEffect(() => {
    if (workflowStatus > 2) getWinner();
  }, [voters, proposals]);

  useEffect(() => {
    getResult();
  }, [isWinner, proposals, voters]);

  return (
    <div className="stat">
      <h1 className="stat-title">
        Winner
        {isWinner && <span>{` id : ${isWinner?.id}`}</span>}
      </h1>
      <div className="stat-value  text-primary  text-[15px]">
        <span className="truncate w-[10px]">
          {isWinner ? isWinner?.proposal?.description : "No vote count"}
        </span>
      </div>
      <div className="stat-desc mt-auto">Winner proposal</div>
      <div className="stat-figure text-primary">
        {isWinner ? (
          <div
            className="radial-progress  text-xs radial-progress-xs bg-primary  text-primary-content border-4 border-primary"
            style={{ "--value": isScore }}
          >
            {isScore}%
          </div>
        ) : (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div>
    </div>
  );
};
