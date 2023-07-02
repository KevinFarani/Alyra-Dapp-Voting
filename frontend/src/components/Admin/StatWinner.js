import React from "react";

export const StatWinner = () => {
  return (
    <div className="stat">
      <h1 className="stat-title">Winner</h1>
      <div className="stat-value truncate text-primary  text-[15px] flex">
        .0
      </div>
      <div className="stat-desc">Winner proposal</div>
      <div className="stat-figure text-primary">
        <div
          className="radial-progress  text-xs radial-progress-xs bg-primary  text-primary-content border-4 border-primary"
          style={{ "--value": 70 }}
        >
          70%
        </div>
      </div>
    </div>
  );
};
