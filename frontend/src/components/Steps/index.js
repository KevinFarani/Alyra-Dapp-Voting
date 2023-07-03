import { ENUMS_STATUS } from "constants/web3";
import { useWeb3State } from "context/web3";
import React from "react";
import { v4 as uuidv4 } from "uuid";
export const Steps = () => {
  const { workflowStatus } = useWeb3State();
  return (
    <ul className="steps w-full my-5">
      {ENUMS_STATUS?.map((el, index) => (
        <li
          data-content={workflowStatus >= index ? "✓" : "⏱"}
          className={`step text-white ${
            workflowStatus >= index ? "step-success" : "step-error"
          }`}
          key={uuidv4()}
        >
          {el.title}
        </li>
      ))}
    </ul>
  );
};
