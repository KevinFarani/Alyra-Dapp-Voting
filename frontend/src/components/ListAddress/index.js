import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const ListAddress = () => {
  const [listAddr, setListAddr] = useState([]);
  const { isConnected, address } = useAccount();
  useEffect(() => {
    if (isConnected) {
    }
  }, [isConnected]);
  return <div>ListAddress</div>;
};
