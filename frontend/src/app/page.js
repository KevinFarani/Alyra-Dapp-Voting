"use client";
import { Admin } from "components/Admin";
import { Header } from "components/Header";
import { useAccount } from "wagmi";
import {
  doWeb3Owner,
  doWeb3Proposal,
  doWeb3Whitelist,
  doWeb3WorkflowStatus,
  useWeb3Dispatch,
  useWeb3State,
} from "context/web3";
import {
  _getAccount,
  _getContractVoting,
  _getEventsVoters,
} from "queries/voting-query";
import { useEffect, useState } from "react";

import { ListAddress } from "components/lists/ListAddress";
import { ListProposals } from "components/lists/ListProposals";
import { ADDR_VOTING, ENUMS_STATUS } from "constants/web3";
import { parseAbiItem } from "viem";
import { viemClient } from "queries/web3-query";
import { Alert } from "components/Alert";

export default function Home() {
  const dispatch = useWeb3Dispatch();
  const { isConnected, address } = useAccount();
  const { workflowStatus } = useWeb3State();
  const [event, setEvent] = useState(null);

  // ! Récupération des events à chaque logs
  const unwatchVoter = viemClient.watchEvent({
    address: ADDR_VOTING,
    event: parseAbiItem("event VoterRegistered(address voterAddress)"),
    onLogs: (logs) => {
      setEvent(
        <Alert
          title={
            <>
              New voter registered
              <span className="text-xs text-primary ml-5 underline">
                {logs[0].args.voterAddress}
              </span>
            </>
          }
          setter={setEvent}
          style={"alert-success text-white"}
          icon={"clarity:new-solid"}
        />
      );
      doWeb3Whitelist(dispatch);
    },
  });
  const unwatchState = viemClient.watchEvent({
    address: ADDR_VOTING,
    event: parseAbiItem(
      "event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)"
    ),
    onLogs: (logs) => {
      setEvent(
        <Alert
          title={
            <>
              Status changed from
              <span className="text-xs text-primary mx-5 underline">
                {ENUMS_STATUS[logs[0].args.previousStatus]?.title}
              </span>
              to
              <span className="text-xs text-primary mx-5 underline">
                {ENUMS_STATUS[logs[0].args.newStatus]?.title}
              </span>
            </>
          }
          setter={setEvent}
          style={"alert-success text-white"}
          icon={"clarity:new-solid"}
        />
      );
      doWeb3WorkflowStatus(dispatch);
    },
  });
  const unwatchProposal = viemClient.watchEvent({
    address: ADDR_VOTING,
    event: parseAbiItem("event ProposalRegistered(uint256 proposalId)"),
    onLogs: (logs) => {
      setEvent(
        <Alert
          title={
            <>
              New proposal registered
              <span className="text-xs text-primary mx-5 underline">
                #id{parseInt(logs[0].args.proposalId)}
              </span>
            </>
          }
          setter={setEvent}
          style={"alert-success text-white"}
          icon={"clarity:new-solid"}
        />
      );
      doWeb3Proposal(dispatch);
    },
  });

  useEffect(() => {
    unwatchVoter;
    unwatchState;
    unwatchProposal;

    doWeb3Owner(dispatch);
    doWeb3Whitelist(dispatch);
    doWeb3WorkflowStatus(dispatch);
    doWeb3Proposal(dispatch);
  }, [isConnected]);

  return (
    <main className="flex flex-col px-5 box-border border-box w-screen  items-center overflow-x-hidden border-box  bg-zinc-950 min-h-screen max-w-screen ">
      <Header />
      <div className="flex flex-col items-center w-[98%] justify-between  border border-white/10  rounded-lg shadow py-4">
        <Admin />

        <div className=" my-5 w-[98%] min-h-[50vh] flex justify-between">
          <ListAddress />
          <div className="divider text-secondary divider-horizontal">
            {isConnected ? (
              ENUMS_STATUS?.[workflowStatus]?.title
            ) : (
              <span className="text-error">Not connected</span>
            )}
          </div>

          <ListProposals />
        </div>
      </div>
      {event}
    </main>
  );
}
