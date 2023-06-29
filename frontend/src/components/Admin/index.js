"use client";
import { Icon } from "@iconify/react";
import { _getEventsVoters, _getterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";
import { useAccount, useContractEvent } from "wagmi";
import { StatWhitelist } from "./StatWhitelist";
import { ABI_CONTRACT_VOTING, ADDR_VOTING } from "constants/web3";
import { watchContractEvent } from "@wagmi/core";
import { createPublicClient, http, parseAbiItem } from "viem";
import { hardhat } from "viem/chains";
import { watchBlockNumber } from "@wagmi/core";
import { viemClient } from "queries/web3-query";

export const Admin = () => {
  const client = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  const [owner, setOwner] = useState("");

  const { isConnected, address } = useAccount();

  const getOwner = async () => {
    const res = await _getterFuncVoting("owner");
    setOwner(res);
  };

  useEffect(() => {
    isConnected && getOwner();
  }, [isConnected]);
  return (
    <div className="stats  shadow w-fit ">
      <div className="stat ">
        <h1 className="stat-title">Admin</h1>
        <div className="stat-value truncate text-primary  text-[15px] w-[100px]">
          {owner}
        </div>
        <div className={`stat-desc ${owner === address && "text-success"}`}>
          Owner voting contract
        </div>
        <div className="stat-figure text-primary">
          <Icon icon="eos-icons:admin-outlined" className="text-2xl" />
        </div>
      </div>
      <StatWhitelist />
      <div className="stat">
        <h1 className="stat-title">Proposals</h1>
        <div className="stat-value truncate text-primary  text-[15px] w-[100px]">
          .0
        </div>
        <div className="stat-desc">Proposals length</div>
        <div className="stat-figure text-primary">
          <Icon icon="fluent:vote-24-regular" className="text-2xl" />
        </div>
      </div>
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
