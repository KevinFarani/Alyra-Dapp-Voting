import { createPublicClient, http, parseAbiItem } from "viem";
import { hardhat } from "viem/chains";

export const viemClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});
