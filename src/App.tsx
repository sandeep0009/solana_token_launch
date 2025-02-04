

import '@solana/wallet-adapter-react-ui/styles.css';
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {  WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';

function App() {
  const network=WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <>
    <ConnectionProvider endpoint={"https://solana-mainnet.g.alchemy.com/v2/yBzlkWFR7LyZlmSKMjCBgTJEYK9LIktp"}>
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <div className='flex justify-between p-6'>

        <WalletMultiButton/>
        <WalletDisconnectButton/>
        </div>

      </WalletModalProvider>

    </WalletProvider>

    </ConnectionProvider>
      
    </>
  )
}

export default App
