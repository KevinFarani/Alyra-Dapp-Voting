"use client";
import { Icon } from "@iconify/react";
import { _getEventsVoters, _getterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { StatWhitelist } from "./StatWhitelist";
import { StatAdmin } from "./StatAdmin";
import {
  doWeb3Owner,
  doWeb3Proposal,
  doWeb3Whitelist,
  doWeb3WorkflowStatus,
  useWeb3Dispatch,
} from "context/web3";
import { StatProposal } from "./StatProposal";

export const Admin = () => {
  const { isConnected, address } = useAccount();
  const dispatch = useWeb3Dispatch();
  useEffect(() => {
    doWeb3Owner(dispatch);
    doWeb3Whitelist(dispatch);
    doWeb3WorkflowStatus(dispatch);
    doWeb3Proposal(dispatch);
  }, [isConnected]);

  return (
    <div className="stats  shadow w-fit ">
      <StatAdmin />
      <StatWhitelist />
      <StatProposal />
      <div className="stat">
        <h1 className="stat-title">Votes</h1>
        <div className="stat-value truncate text-primary  text-[15px] flex">
          .0
        </div>
        <div className="stat-desc">Votes length</div>
        <div className="stat-figure text-primary">
          <Icon icon="game-icons:podium-winner" className="text-2xl" />
        </div>
      </div>
      <div className="stat">
        <h1 className="stat-title">Winner</h1>
        <div className="stat-value truncate text-primary  text-[15px] flex">
          .0
        </div>
        <div className="stat-desc">Winner proposal</div>
        <div className="stat-figure text-primary">
          <div
            className="radial-progress  text-xs radial-progress-xs bg-primary  text-primary-content border-4 border-primary"
            style={{ "--value": 70 }}
          >
            70%
          </div>
          {/* <Icon icon="game-icons:podium-winner" className="text-2xl" /> */}
        </div>
      </div>
    </div>
  );
};
