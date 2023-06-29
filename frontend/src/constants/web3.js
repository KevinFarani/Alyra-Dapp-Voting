export const ADDR_VOTING = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

import ABI from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";

export const ABI_CONTRACT_VOTING = ABI.abi;

export const ENUMS_STATUS = [
  "Registering Voters",
  "Proposals Registration Started",
  "Proposals Registration Ended",
  "Voting Session Started",
  "Voting Session Ended",
  "Votes Tallied",
];
