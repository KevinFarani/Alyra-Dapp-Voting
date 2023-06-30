"use client";
import { Admin } from "components/Admin";
import { Header } from "components/Header";
import { useAccount } from "wagmi";
import { useWeb3Dispatch, useWeb3State } from "context/web3";
import { _getAccount, _getContractVoting } from "queries/voting-query";
import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import { prepareWriteContract, writeContract, readContract } from "@wagmi/core";
import { ABI_CONTRACT_VOTING, ADDR_VOTING } from "constants/web3";
import { ListAddress } from "components/lists/ListAddress";
import { ListProposals } from "components/lists/ListProposals";

export default function Home() {
  const { voting } = useWeb3State();
  const dispatch = useWeb3Dispatch();
  const { isConnected, address } = useAccount();

  useEffect(() => {}, [isConnected]);

  return (
    <main className="flex flex-col px-5 box-border w-screen bg-gradient-to-l from-sky-800 to-sky-500 h-screen max-w-screen ">
      <Header />
      <div className="flex flex-wrap justify-between p-5 bg-zinc-800 rounded-lg shadow ">
        <div className="mx-auto mb-5">
          <Admin />
        </div>
        <div className="w-1/2 ">
          <ListAddress />
        </div>
        <div className="w-1/3 ">
          <ListProposals />
        </div>
      </div>

      <div className="flex ">
        Voting Contract:
        <span className="truncate  w-[80px]">{voting?.target}</span>
      </div>
    </main>
  );
}
