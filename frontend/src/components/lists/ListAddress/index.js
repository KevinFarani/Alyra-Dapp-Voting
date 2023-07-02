import { useWeb3State } from "context/web3";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const ListAddress = () => {
  const { address } = useAccount();
  const { voters } = useWeb3State();

  return (
    <div className="overflow-x-auto w-2/5">
      <h1 className="text-white uppercase font-black">Voter List</h1>{" "}
      <table className="table  table-zebra border border-white/10 ">
        {/* head */}
        <thead className="">
          <tr>
            <th>Address</th>
            <th>Vote</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {voters?.map((voter, index) => (
            <tr
              key={voter}
              // className={`${index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-900"}`}
            >
              <th>{index}</th>
              <td className={`${voter === address && "text-info"}`}>{voter}</td>
              <td>Waiting start ...</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
