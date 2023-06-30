import { useWeb3State } from "context/web3";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const ListAddress = () => {
  const [listAddr, setListAddr] = useState([]);
  const { isConnected, address } = useAccount();
  const { voters } = useWeb3State();

  useEffect(() => {
    if (isConnected) {
    }
  }, [isConnected]);
  return (
    <div className="overflow-x-auto rounded-2xl  ">
      <table className="table shadows ">
        {/* head */}
        <thead className="bg-zinc-600">
          <tr>
            <th>#VoterId</th>
            <th>Address</th>
            <th>Vote</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {voters?.map((voter, index) => (
            <tr
              key={voter}
              className={`${index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-900"}`}
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
