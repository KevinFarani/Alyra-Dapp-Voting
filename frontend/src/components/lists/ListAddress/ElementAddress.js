import { Icon } from "@iconify/react";
import { useWeb3State } from "context/web3";
import { _getVoter, _getterFuncVoting } from "queries/voting-query";
import { useAccount } from "wagmi";

export const ElementAddress = ({ voter, index }) => {
  const { address } = useAccount();
  const { proposals, voters } = useWeb3State();

  return (
    <tr>
      <th>
        {voter?.state?.hasVoted === true && (
          <Icon icon="ph:check-fill" className="text-success text-2xl" />
        )}
      </th>
      <td className={`${voter.address === address && "text-info"} w-[20px]`}>
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
