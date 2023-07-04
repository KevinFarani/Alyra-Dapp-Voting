const { ethers } = require("hardhat");
const { ADDR_VOTING } = require("../constants");

async function main() {
  [
    this.owner,
    this.addr1,
    this.addr2,
    this.addr3,
    this.addr4,
    this.addr5,
    this.addr6,
    this.addr7,
  ] = await ethers.getSigners();
  const addresses = [
    this.owner,
    this.addr1,
    this.addr2,
    this.addr3,
    this.addr4,
    this.addr5,
    this.addr6,
    this.addr7,
  ];

  const voting = await ethers.getContractAt("Voting", ADDR_VOTING);

  for (let index = 0; index < addresses.length; index++) {
    try {
      await voting.connect(this.owner).addVoter(addresses[index].address);
      console.log(`voter ${addresses[index].address} registered`);
    } catch (error) {
      console.log("error : Registered Voter", error);
    }
  }

  await voting.connect(this.owner).startProposalsRegistering();

  for (let index = 0; index < addresses.length; index++) {
    try {
      await voting.connect(addresses[index]).addProposal(`Proposal ${index}`);
      console.log(`Proposal ${index} added`);
    } catch (error) {
      console.log("error : addProposal", error);
    }
  }

  await voting.connect(this.owner).endProposalsRegistering();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
<<<<<<< HEAD
});
=======
});
>>>>>>> front
