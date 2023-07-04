import { Icon } from "@iconify/react";
import { useWeb3State } from "context/web3";
import { _getEventsVoters, _getEventsVotes } from "queries/voting-query";
import React, { useEffect, useState } from "react";

export const StatVote = () => {
  const [isLength, setIsLength] = useState(null);
  const { proposals, voters } = useWeb3State();
  const getVotes = async () => {
    const votes = await _getEventsVotes();
    setIsLength(votes.length);
  };

  useEffect(() => {
    getVotes();
  }, [proposals, voters]);

  return (
    <div className="stat">
      <h1 className="stat-title">Votes</h1>
      <div className="stat-value truncate text-primary  text-[15px] flex">
        <span className="countdown">
          <span style={{ "--value": isLength }}></span>
        </span>
      </div>
      <div className="stat-desc mt-auto">Votes length</div>
      <div className="stat-figure text-primary">
        <Icon icon="game-icons:podium-winner" className="text-2xl" />
      </div>
    </div>
  );
};
