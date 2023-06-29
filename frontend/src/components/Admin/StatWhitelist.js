import { Icon } from "@iconify/react";
import { _getEventsVoters, _setterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const StatWhitelist = () => {
  const [value, setValue] = useState("");
  const [whitelist, setWhitelist] = useState([]);
  const { address } = useAccount();
  const getEvents = async () => {
    const events = await _getEventsVoters();
    setWhitelist(events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleClick = async (e) => {
    const res = await _setterFuncVoting("addVoter", [value]);
    getEvents();
  };

  return (
    <div className="stat relative w-[250px] ">
      <h1 className="stat-title">Whitelist</h1>
      <div className="stat-value  truncate  text-primary text-[15px]   ">
        <span className="countdown">
          <span style={{ "--value": whitelist.length }}></span>
        </span>
      </div>
      <div className="stat-desc join mt-auto  w-[130%]">
        <input
          placeholder="Add whitelist address"
          onChange={(e) => setValue(e.target.value)}
          className="input w-full input-bordered input-primary text-xs input-xs join-item"
        />
        <button className="join-item btn btn-xs" onClick={handleClick}>
          +
        </button>
      </div>

      <div
        className={`stat-figure ${
          whitelist.includes(address) ? "text-success" : "text-error"
        }`}
      >
        <Icon icon="clarity:list-solid" className="text-2xl" />
      </div>
    </div>
  );
};
