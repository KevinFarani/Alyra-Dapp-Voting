import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <div className="flex  p-4 justify-between w-full h-[15vh]">
      <h1 className="text-2xl">Voting dapp</h1>
      <div className="">
        <ConnectButton />
      </div>
    </div>
  );
};
