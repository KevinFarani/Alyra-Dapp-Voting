import { Icon } from "@iconify/react";
import { ENUMS_STATUS } from "constants/web3";
import {
  doWeb3WorkflowStatus,
  useWeb3Dispatch,
  useWeb3State,
} from "context/web3";
import { _getterFuncVoting, _setterFuncVoting } from "queries/voting-query";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const StatAdmin = () => {
  const { workflowStatus, owner } = useWeb3State();

  const dispatch = useWeb3Dispatch();
  const { address } = useAccount();

  const handleClick = async (setterStatus) => {
    await _setterFuncVoting(setterStatus, []);
    doWeb3WorkflowStatus(dispatch);
  };
  return (
    <>
      <div className="stat ">
        <h1 className="stat-title">Admin</h1>
        <div className="stat-value truncate text-primary  text-[15px] w-[100px]">
          {owner}
        </div>
        <div className={`stat-desc ${owner === address && "text-success"}`}>
          Owner voting contract
        </div>
        <div className="stat-figure text-primary">
          <Icon icon="eos-icons:admin-outlined" className="text-2xl" />
        </div>
      </div>
      <div className="stat ">
        <h1 className="stat-title">State</h1>
        <div className="stat-value  text-primary  text-[13px]">
          {ENUMS_STATUS?.[workflowStatus]?.title}
        </div>
        <div
          className={`stat-desc text-[9px] ${
            owner === address && "text-success"
          }`}
        >
          {address === owner ? (
            <div className="join">
              {workflowStatus < ENUMS_STATUS.length - 1 ? (
                <button
                  className="btn join-item btn-xs  btn-success btn-outline text-[9px] "
                  onClick={() =>
                    handleClick(ENUMS_STATUS?.[workflowStatus + 1]?.setter)
                  }
                >
                  Open :
                  <span className="ml-1 text-grey">
                    {ENUMS_STATUS?.[workflowStatus + 1]?.title}
                  </span>
                </button>
              ) : (
                <div className="btn btn-xs btn-error btn-outline">Closed</div>
              )}
            </div>
          ) : (
            <>
              Waiting :{" "}
              <span className="text-white">
                {ENUMS_STATUS?.[workflowStatus + 1]?.title}
              </span>
            </>
          )}
        </div>
        <div className="stat-figure text-primary">
          <Icon icon="bi:flag" className="text-2xl" />
        </div>
      </div>
    </>
  );
};
