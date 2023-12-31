import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Icon } from "@iconify/react";
import { ADDR_VOTING } from "constants/web3";

export const Header = () => {
  return (
    <div className="flex bg-zinc-900 p-4 justify-between border-b border-white/40 items-center w-full h-[10vh] ">
      <div>
        <h1 className="text-2xl text-white uppercase font-black flex items-center">
          <Icon icon={"ic:outline-how-to-vote"} className="text-[40px] mr-5" />
          Voting
        </h1>
        <span className="text-[7px] text-white">{ADDR_VOTING}</span>
      </div>
      <div className="">
        <ConnectButton />
      </div>
    </div>
  );
};
