"use client";
import { Admin } from "components/Admin";
import { Header } from "components/Header";
import {
  doWeb3Auth,
  doWeb3ContractVoting,
  useWeb3Dispatch,
  useWeb3State,
} from "context/web3";
import { _getAccount, _getContractVoting } from "queries/voting-query";
import { useEffect } from "react";

export default function Home() {
  const { address, voting } = useWeb3State();
  const dispatch = useWeb3Dispatch();

  useEffect(() => {
    if (!address) {
      doWeb3Auth(dispatch); // Récupérer l'address eth
    } else {
      // Si adrress on peux ...
      doWeb3ContractVoting(dispatch); // Récupérer le contrat Voting
    }
  }, [address]);

  console.log("address", address);
  console.log("voting", voting);

  return (
    <main className="flex flex-col">
      <Header />
      <h1>Voting dapp</h1>
      <Admin />
      <div className="flex ">
        Address User:
        <span className="truncate  w-[80px]">{address}</span>
      </div>
      <div className="flex ">
        Voting Contract:
        <span className="truncate  w-[80px]">{voting?.target}</span>
      </div>
    </main>
  );
}
