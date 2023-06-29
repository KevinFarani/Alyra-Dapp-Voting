// import { ethers } from "ethers";

import { ABI_CONTRACT_VOTING, ADDR_VOTING } from "constants/web3";
import { prepareWriteContract, writeContract, readContract } from "@wagmi/core";
import { viemClient } from "./web3-query";
import { parseAbiItem } from "viem";

export const _setterFuncVoting = async (funcName, args, getterFuncName) => {
  try {
    const { request } = await prepareWriteContract({
      address: ADDR_VOTING,
      abi: ABI_CONTRACT_VOTING,
      functionName: funcName,
      args: args,
    });
    const { hash } = await writeContract(request);

    return hash;
  } catch (error) {
    console.log("error", error);
  }
};

export const _getterFuncVoting = async (funcName) => {
  try {
    const res = await readContract({
      address: ADDR_VOTING,
      abi: ABI_CONTRACT_VOTING,
      functionName: funcName,
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const _getEventsVoters = async () => {
  const events = await viemClient.getLogs({
    event: parseAbiItem("event VoterRegistered(address voterAddress)"),
    fromBlock: 0n,
    toBlock: "latest",
  });
  const voters = events.map((voter) => voter.args.voterAddress);
  return voters;
};
