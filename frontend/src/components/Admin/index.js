"use client";

import { _getEventsVoters, _getterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { StatWhitelist } from "./StatWhitelist";
import { StatAdmin } from "./StatAdmin";

import { StatProposal } from "./StatProposal";
import { StatVote } from "./StatVote";
import { StatWinner } from "./StatWinner";

export const Admin = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="stats  shadow w-fit ">
      <StatAdmin />
      <StatWhitelist />
      <StatProposal />
      <StatVote />
      <StatWinner />
    </div>
  );
};
