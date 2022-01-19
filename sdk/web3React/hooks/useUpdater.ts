import { useEffect, useState } from 'react';
import { TransactionReceipt } from '@ethersproject/providers';
import { useActiveWeb3React } from '.';

export default function useUpdater() {
  const { library } = useActiveWeb3React();
  const [hash, setHash] = useState('');
  const [receipt, setReceipt] = useState<TransactionReceipt>();

  useEffect(() => {
    if (hash) {
      library?.waitForTransaction(hash).then((_receipt) => {
        _receipt && setReceipt(_receipt);
      });
    } else {
      setReceipt(undefined);
    }
  }, [hash, library]);

  return {
    hash,
    setHash,
    receipt,
  };
}
