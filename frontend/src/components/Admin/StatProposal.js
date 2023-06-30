import { Icon } from "@iconify/react";
import { useWeb3State } from "context/web3";
import { _getEventsProposals } from "queries/voting-query";
import React, { useEffect } from "react";

export const StatProposal = () => {
  const { proposals, workflowStatus } = useWeb3State();

  return (
    <div className="stat">
      <h1 className="stat-title">Proposals</h1>
      <div className="stat-value truncate text-primary  text-[15px] w-[100px]">
        <span className="countdown">
          <span style={{ "--value": proposals.length }}></span>
        </span>
      </div>
      <div className={`stat-desc ${workflowStatus === 1 && "text-info"}`}>
        {workflowStatus === 1 ? "Registration open !" : "Proposals length"}
      </div>
      <div className="stat-figure text-primary">
        <Icon icon="fluent:vote-24-regular" className="text-2xl" />
      </div>
    </div>
  );
};
