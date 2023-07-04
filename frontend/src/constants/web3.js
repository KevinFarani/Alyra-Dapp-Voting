// USE LOCAL BLOCKCHAIN (HARDHAT)
//export const ADDR_VOTING = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const ADDR_VOTING = "0xF34Bb29730A719e91AaAF2556A31221e4bF24703";

import ABI from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";

export const ABI_CONTRACT_VOTING = ABI.abi;

export const ENUMS_STATUS = [
  { title: "Registering Voters" },
  {
    title: "Proposals Registration Started",
    setter: "startProposalsRegistering",
  },
  { title: "Proposals Registration Ended", setter: "endProposalsRegistering" },

  { title: "Voting Session Started", setter: "startVotingSession" },
  { title: "Voting Session Ended", setter: "endVotingSession" },
  { title: "Votes Tallied", setter: "tallyVotes" },
];
