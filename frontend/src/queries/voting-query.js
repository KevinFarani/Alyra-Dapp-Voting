// import { ethers } from "ethers";

import { ABI_CONTRACT_VOTING, ADDR_VOTING } from "constants/web3";
import { prepareWriteContract, writeContract, readContract } from "@wagmi/core";
import { viemClient } from "./web3-query";
import { parseAbiItem } from "viem";

export const _setterFuncVoting = async (funcName, args) => {
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

export const _getterFuncVoting = async (funcName, args) => {
  try {
    const res = await readContract({
      address: ADDR_VOTING,
      abi: ABI_CONTRACT_VOTING,
      functionName: funcName,
      args: args,
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const _getVoter = async (address) => {
  const voter = await _getterFuncVoting("getVoter", [address]);
  return voter;
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
export const _getEventsProposals = async () => {
  const events = await viemClient.getLogs({
    event: parseAbiItem("event ProposalRegistered(uint proposalId)"),
    fromBlock: 0n,
    toBlock: "latest",
  });

  const proposals = events.map((proposals) =>
    parseInt(proposals.args.proposalId)
  );
  return proposals;
};
export const _getEventsVotes = async () => {
  const events = await viemClient.getLogs({
    event: parseAbiItem("event Voted(address voter, uint256 proposalId)"),
    fromBlock: 0n,
    toBlock: "latest",
  });

  return events;
};

export const _getProposals = async () => {
  const proposals = await _getEventsProposals();
  let arr = [];
  // ? "<=" pour partir depuis la proposal genesis
  for (let index = 0; index <= proposals.length; index++) {
    const element = {
      proposal: await _getterFuncVoting("getOneProposal", [index]),
      id: index,
    };

    arr.push(element);
  }
  return arr;
};
