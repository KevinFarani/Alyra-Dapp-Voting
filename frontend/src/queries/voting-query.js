// import { ethers } from "ethers";

import Voting from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { ADDR_VOTING } from "constants/address";

export const _getAccount = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const result = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return result[0];
    } catch (error) {
      return error;
    }
  }
};

export const _getProvider = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // const provider = new ethers.getDefaultProvider();
    // return provider;
  }
};

export const _getContractVoting = async () => {
  // const provider = await _getProvider();
  // const contract = await new ethers.Contract(ADDR_VOTING, Voting.abi, provider);
  // return contract;
};
