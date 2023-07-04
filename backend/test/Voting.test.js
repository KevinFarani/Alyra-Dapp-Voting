const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

const CONTRACT_NAME = process.env.CONTRACT_NAME || "Voting";

describe(`Contract ${CONTRACT_NAME} `, () => {
  let voting;

  beforeEach(async () => {
    [this.owner, this.addr1, this.addr2] = await ethers.getSigners();
    let contract = await ethers.getContractFactory(CONTRACT_NAME);
    voting = await contract.deploy();
  });

  // ----------------------------------------
  //* ::::::::::: Initialisation :::::::::::
  // ----------------------------------------

  describe("Initialization", () => {
    it("Should return good owner", async () => {
      let _owner = await voting.owner();
      expect(_owner).to.equal(this.owner.address);
    });

    it("Should get winning proposal ID equal 0", async () => {
      let winningProposalID = await voting.winningProposalID();
      expect(winningProposalID).to.equal(0);
    });

    it("Should NOT change workflow status", async () => {
      await expectRevert(
        voting.endProposalsRegistering(),
        "Registering proposals havent started yet"
      );
      await expectRevert(
        voting.startVotingSession(),
        "Registering proposals phase is not finished"
      );
      await expectRevert(
        voting.endVotingSession(),
        "Voting session havent started yet"
      );
      await expectRevert(
        voting.tallyVotes(),
        "Current status is not voting session ended"
      );
    });

    it("Should NOT change workflow status if you're not owner", async () => {
      await expectRevert(
        voting.connect(this.addr1).startProposalsRegistering(),
        "Ownable: caller is not the owner"
      );
      await expectRevert(
        voting.connect(this.addr1).endProposalsRegistering(),
        "Ownable: caller is not the owner"
      );
      await expectRevert(
        voting.connect(this.addr1).startVotingSession(),
        "Ownable: caller is not the owner"
      );
      await expectRevert(
        voting.connect(this.addr1).endVotingSession(),
        "Ownable: caller is not the owner"
      );
      await expectRevert(
        voting.connect(this.addr1).tallyVotes(),
        "Ownable: caller is not the owner"
      );
    });

    it("Should NOT add voter if you're not owner", async () => {
      await expectRevert(
        voting.connect(this.addr1).addVoter(this.addr1.address),
        "Ownable: caller is not the owner"
      );
    });

    it("Should NOT change to preview status", async () => {
      await voting.startProposalsRegistering();
      await voting.endProposalsRegistering();
      await expectRevert(
        voting.startProposalsRegistering(),
        "Registering proposals cant be started now"
      );

      await voting.startVotingSession();
      await expectRevert(
        voting.startProposalsRegistering(),
        "Registering proposals cant be started now"
      );
      await expectRevert(
        voting.endProposalsRegistering(),
        "Registering proposals havent started yet"
      );

      await voting.endVotingSession();
      await expectRevert(
        voting.startProposalsRegistering(),
        "Registering proposals cant be started now"
      );
      await expectRevert(
        voting.endProposalsRegistering(),
        "Registering proposals havent started yet"
      );
      await expectRevert(
        voting.startVotingSession(),
        "Registering proposals phase is not finished"
      );

      await voting.tallyVotes();
      await expectRevert(
        voting.startProposalsRegistering(),
        "Registering proposals cant be started now"
      );
      await expectRevert(
        voting.endProposalsRegistering(),
        "Registering proposals havent started yet"
      );
      await expectRevert(
        voting.startVotingSession(),
        "Registering proposals phase is not finished"
      );
      await expectRevert(
        voting.endVotingSession(),
        "Voting session havent started yet"
      );
    });

    it("Should change workflow status", async () => {
      await voting.startProposalsRegistering();
      let status = await voting.workflowStatus();
      expect(status).to.equal(1);

      await voting.endProposalsRegistering();
      status = await voting.workflowStatus();
      expect(status).to.equal(2);

      await voting.startVotingSession();
      status = await voting.workflowStatus();
      expect(status).to.equal(3);

      await voting.endVotingSession();
      status = await voting.workflowStatus();
      expect(status).to.equal(4);
    });
  });
  // -

  // ----------------------------------------
  //* ::::::::::: Registering Voters :::::::::::
  // ----------------------------------------

  describe("Registering Voters", () => {
    beforeEach(async () => {
      await voting.addVoter(this.owner.address); // Need to validate onlyVoters modifier
    });

    it("Should return registering voters workflow status", async () => {
      let status = await voting.workflowStatus();
      expect(status).to.equal(0);
    });

    it("Should register voters", async () => {
      await expect(voting.addVoter(this.addr1.address))
        .to.emit(voting, "VoterRegistered")
        .withArgs(this.addr1.address);
      let voter1 = await voting.getVoter(this.addr1.address);
      expect(voter1.isRegistered).to.equal(true);
      expect(voter1.hasVoted).to.equal(false);
      expect(voter1.votedProposalId).to.equal(0);

      await expect(voting.addVoter(this.addr2.address))
        .to.emit(voting, "VoterRegistered")
        .withArgs(this.addr2.address);
      let voter2 = await voting.getVoter(this.addr2.address);
      expect(voter2.isRegistered).to.equal(true);
      expect(voter2.hasVoted).to.equal(false);
      expect(voter2.votedProposalId).to.equal(0);
    });

    it("Should return unregistred voter", async () => {
      let voter = await voting.getVoter(this.addr1.address);
      expect(voter.isRegistered).to.equal(false);
      expect(voter.hasVoted).to.equal(false);
      expect(voter.votedProposalId).to.equal(0);
    });

    it("Should NOT register voters if already registered", async () => {
      await voting.addVoter(this.addr1.address);
      await expectRevert(
        voting.addVoter(this.addr1.address),
        "Already registered"
      );
    });

    it("Should NOT register voters if wrong workflow status", async () => {
      await voting.startProposalsRegistering();
      await expectRevert(
        voting.addVoter(this.addr1.address),
        "Voters registration is not open yet"
      );
    });

    it("Should NOT get voter if you're not voter", async () => {
      expectRevert(
        voting.connect(this.addr1).getVoter(this.owner.address),
        "You're not a voter"
      );
    });
  });
  // -

  // ----------------------------------------
  //* ::::::::::: Proposals Registration Started :::::::::::
  // ----------------------------------------

  describe("Proposals Registration Started", () => {
    let numberProposals = 4; // Number of proposals to add

    beforeEach(async () => {
      await voting.addVoter(this.owner.address);
      await voting.addVoter(this.addr1.address);
      await voting.startProposalsRegistering(); // Need to change state to add proposals
    });

    it("Should return proposals registration started workflow status", async () => {
      const status = await voting.workflowStatus();
      expect(status).to.equal(1);
    });

    it("Should return genesis proposals", async () => {
      const genesisProposal = await voting.getOneProposal(0);
      expect(genesisProposal.description).to.equal("GENESIS");
      expect(genesisProposal.voteCount).to.equal(0);
    });

    it("Should NOT return other proposals than genesis", async () => {
      for (let index = 1; index < numberProposals; index++) {
        await expectRevert.unspecified(voting.getOneProposal(index));
      }
    });

    it("Should add proposals", async () => {
      for (let index = 1; index < numberProposals; index++) {
        // Start at 1 because of genesis proposal
        const proposalDesc = `Proposal ${index}`;
        await expect(voting.addProposal(proposalDesc))
          .to.emit(voting, "ProposalRegistered")
          .withArgs(index);

        const proposal = await voting.getOneProposal(index);
        await expect(proposal.description).to.equal(proposalDesc);
        await expect(proposal.voteCount).to.equal(0);
      }
      await expectRevert.unspecified(
        voting.getOneProposal(numberProposals + 1)
      );
    });

    it("Should NOT add an empty proposal", async () => {
      await expectRevert(
        voting.addProposal(""),
        "Vous ne pouvez pas ne rien proposer"
      );
    });

    it("Should NOT get proposal if you're not voter", async () => {
      await expectRevert(
        voting.connect(this.addr2).getOneProposal(0),
        "You're not a voter"
      );
    });

    it("Should NOT add proposal if you're not voter", async () => {
      await expectRevert(
        voting.connect(this.addr2).addProposal("Proposal 1"),
        "You're not a voter"
      );
    });

    it("Should NOT set vote if wrong workflow status", async () => {
      await expectRevert(
        voting.setVote(0),
        "Voting session havent started yet"
      );
    });
  });
  // -

  // ----------------------------------------
  //* ::::::::::: Proposals Registration Ended :::::::::::
  // ----------------------------------------

  describe("Proposals Registration Ended", () => {
    let proposalsLength = 4;

    beforeEach(async () => {
      await voting.addVoter(this.owner.address);
      await voting.addVoter(this.addr1.address);
      await voting.startProposalsRegistering();

      for (let index = 1; index < proposalsLength; index++) {
        await voting.addProposal(`Proposal ${index}`);
      }

      await voting.endProposalsRegistering();
    });

    it("Should return proposals registration ended workflow status", async () => {
      expect(await voting.workflowStatus()).to.equal(2);
    });

    it("Should return valid length of proposals", async () => {
      await voting.getOneProposal(proposalsLength - 1);
      await expectRevert.unspecified(voting.getOneProposal(proposalsLength));
    });

    it("Should return good value of proposals", async () => {
      const genesis = await voting.getOneProposal(0);
      expect(await genesis.description).to.equal(`GENESIS`);
      expect(await genesis.voteCount).to.equal(0);

      for (let index = 1; index < proposalsLength; index++) {
        const proposal = await voting.getOneProposal(index);
        expect(await proposal.description).to.equal(`Proposal ${index}`);
        expect(await proposal.voteCount).to.equal(0);
      }
    });

    it("Should NOT add proposal if registering not open", async () => {
      await expectRevert(
        voting.addProposal("Proposal 1"),
        "Proposals are not allowed yet"
      );
    });
  });
  // -

  // ----------------------------------------
  //* ::::::::::: Voting Session Started :::::::::::
  // ----------------------------------------

  describe("Voting Session Started", () => {
    let proposalsLength = 4;

    beforeEach(async () => {
      await voting.addVoter(this.owner.address);
      await voting.addVoter(this.addr1.address);
      await voting.startProposalsRegistering();
      for (let index = 1; index < proposalsLength; index++) {
        await voting.addProposal(`Proposal ${index}`);
      }
      await voting.endProposalsRegistering();
      await voting.startVotingSession();
    });

    it("Should return voting session started workflow status", async () => {
      expect(await voting.workflowStatus()).to.equal(3);
    });

    it("Should NOT vote if you're not voter", async () => {
      await expectRevert(
        voting.connect(this.addr2).setVote(0),
        "You're not a voter"
      );
    });

    it("Should set vote", async () => {
      const voteId = 0;
      await expect(voting.setVote(voteId))
        .to.emit(voting, "Voted")
        .withArgs(this.owner.address, voteId);

      const proposal = await voting.getOneProposal(voteId);
      expect(proposal.voteCount).to.equal(1);

      const voter = await voting.getVoter(this.owner.address);
      expect(voter.hasVoted).to.equal(true);
      expect(voter.votedProposalId).to.equal(voteId);
    });

    it("Should NOT set vote if already voted", async () => {
      await voting.setVote(0);
      await expectRevert(voting.setVote(0), "You have already voted");
    });

    it("Should NOT set vote if proposal doesn't exist", async () => {
      await expectRevert(
        voting.setVote(proposalsLength + 1),
        "Proposal not found"
      );
    });
  });
  // -

  // ----------------------------------------
  //* ::::::::::: Voting Session Ended :::::::::::
  // ----------------------------------------

  describe("Voting Session Ended", () => {
    let proposalsLength = 4;

    beforeEach(async () => {
      await voting.addVoter(this.owner.address);
      await voting.addVoter(this.addr1.address);
      await voting.startProposalsRegistering();
      for (let index = 1; index < proposalsLength; index++) {
        await voting.addProposal(`Proposal ${index}`);
      }
      await voting.endProposalsRegistering();
      await voting.startVotingSession();
      await voting.setVote(1);
      await voting.connect(this.addr1).setVote(1);
      await voting.endVotingSession();
    });

    it("Should return voting session ended workflow status", async () => {
      expect(await voting.workflowStatus()).to.equal(4);
    });

    it("Should NOT set vote if voting session ended", async () => {
      await expectRevert(
        voting.setVote(0),
        "Voting session havent started yet"
      );
    });

    it("Should return a good voting results", async () => {
      for (let index = 0; index < proposalsLength; index++) {
        const proposal = await voting.getOneProposal(index);
        expect(await proposal.voteCount).to.equal(index === 1 ? 2 : 0);
      }
    });

    it("Should winnerId still be equal 0", async () => {
      expect(await voting.winningProposalID()).to.equal(0);
    });
  });
  // -

  // ----------------------------------------
  //* ::::::::::: Tally Votes :::::::::::
  // ----------------------------------------

  describe("Tally Votes", () => {
    let proposalsLength = 4;
    beforeEach(async () => {
      await voting.addVoter(this.owner.address);
      await voting.addVoter(this.addr1.address);
      await voting.startProposalsRegistering();
      for (let index = 1; index < proposalsLength; index++) {
        await voting.addProposal(`Proposal ${index}`);
      }
      await voting.endProposalsRegistering();
      await voting.startVotingSession();
      await voting.setVote(1);
      await voting.connect(this.addr1).setVote(1);
      await voting.endVotingSession();
      await voting.tallyVotes();
    });

    it("Should return tally votes workflow status", async () => {
      expect(await voting.workflowStatus()).to.equal(5);
    });

    it("Should return a good winner id", async () => {
      expect(await voting.winningProposalID()).to.equal(1);
    });

    it("Should get winner id even if you're not registred", async () => {
      expect(await voting.connect(this.addr2).winningProposalID()).to.equal(1);
    });
  });
  // -
});
