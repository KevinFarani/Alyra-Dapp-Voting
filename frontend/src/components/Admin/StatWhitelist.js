import { Icon } from "@iconify/react";
import { Alert } from "components/Alert";
import { doWeb3Whitelist, useWeb3Dispatch, useWeb3State } from "context/web3";
import { _getEventsVoters, _setterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const StatWhitelist = () => {
  const [value, setValue] = useState("");

  const [event, setEvent] = useState(null);

  const { address } = useAccount();
  const dispatch = useWeb3Dispatch();
  const { voters, workflowStatus, owner } = useWeb3State();

  const handleClick = async () => {
    const hash = await _setterFuncVoting("addVoter", [value]);
    if (hash) {
      doWeb3Whitelist(dispatch);
      setValue("");
    } else {
      setEvent(
        <Alert
          icon={"clarity:warning-line"}
          title={
            "Oups ... Something went wrong ! Please verified address and if is not already whitelisted"
          }
          setter={setEvent}
          style={"alert-error text-white"}
        />
      );
    }
  };

  return (
    <div className="stat relative">
      <h1 className="stat-title">Whitelist</h1>
      <div className="stat-value  truncate  text-primary text-[15px]   ">
        <span className="countdown">
          <span style={{ "--value": voters.length }}></span>
        </span>
      </div>
      <div className="stat-desc join mt-auto  w-[130%]">
        {address === owner && workflowStatus === 0 ? (
          <>
            <input
              placeholder="Add whitelist address"
              onChange={(e) => setValue(e.target.value)}
              className="input w-full input-bordered input-primary text-xs input-xs join-item"
            />
            <button className="join-item btn btn-xs" onClick={handleClick}>
              +
            </button>
          </>
        ) : (
          <>Waiting Result</>
        )}
      </div>

      <div
        className={`stat-figure ${
          voters.find((e) => e.address === address)
            ? "text-success"
            : "text-error"
        }`}
      >
        <Icon icon="clarity:list-solid" className="text-2xl" />
      </div>
      {event && event}
    </div>
  );
};
