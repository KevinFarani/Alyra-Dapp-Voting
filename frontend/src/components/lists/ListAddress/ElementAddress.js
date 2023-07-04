import { Icon } from "@iconify/react";
import { useWeb3State } from "context/web3";
import { _getVoter, _getterFuncVoting } from "queries/voting-query";
import { useAccount } from "wagmi";

export const ElementAddress = ({ voter, index }) => {
  const { address } = useAccount();
  const { proposals, voters } = useWeb3State();

  return (
    <tr className={`${voter?.address === address ? "bg-primary text-base-100" : index % 2 === 0 ? "bg-base-100 text-zinc-900" : "bg-zinc-900 text-base-100"}`}>
      <th>
        {voter?.state?.hasVoted === true && (
          <Icon icon="ph:check-fill" className="text-success text-2xl" />
        )}
      </th>
      <td>
        <span className="truncate w-[30px]">{voter?.address || voter}</span>
      </td>
      <td>
        {voter?.state?.hasVoted ? (
          <>
            #{parseInt(voter?.state?.votedProposalId)}
            <span className="ml-4">
              {proposals[voter?.state?.votedProposalId]?.proposal?.description}
            </span>
          </>
        ) : (
          <span className="text-error">Waiting vote ...</span>
        )}
      </td>
      <td></td>
    </tr>
  );
};
