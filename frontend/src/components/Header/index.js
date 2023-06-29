import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <div className="flex justify-between w-screen h-[15vh]">
      <h1 className="text-2xl">Voting dapp</h1>
      <ConnectButton />
    </div>
  );
};
