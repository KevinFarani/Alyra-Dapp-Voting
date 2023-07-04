import { useWeb3State } from "context/web3";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ElementAddress } from "./ElementAddress";
import { v4 as uuidv4 } from "uuid";
export const ListAddress = () => {
  const { address } = useAccount();
  const { voters } = useWeb3State();

  return (
    <div className="overflow-x-auto w-2/5">
      <h1 className="text-white uppercase font-black">Voter List</h1>{" "}
      <table className="table border border-white/10 ">
        {/* head */}
        <thead className="text-accent">
          <tr>
            <th></th>
            <th>Address</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {voters?.map((voter, index) => (
            <ElementAddress key={uuidv4()} index={index} voter={voter} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
