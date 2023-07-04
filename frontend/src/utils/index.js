import { _getterFuncVoting } from "queries/voting-query";

export const doHasVoted = async (address) => {
  const voter = await _getterFuncVoting("getVoter", [address]);

  return voter;
};
