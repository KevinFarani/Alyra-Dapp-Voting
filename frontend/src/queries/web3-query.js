import { createPublicClient, http, parseAbiItem } from "viem";
import { hardhat, goerli } from "viem/chains";

// USE FOR LOCAL BLOCKCHAIN (HARDHAT)
//export const viemClient = createPublicClient({
//  chain: hardhat,
//  transport: http(),
//});

export const viemClient = createPublicClient({
  chain: goerli,
  transport: http(),
});
