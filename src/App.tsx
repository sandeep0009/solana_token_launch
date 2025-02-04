

import '@solana/wallet-adapter-react-ui/styles.css';
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {  WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useMemo, useState } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { TokenLaunchPad } from './components/CreateToken';

function App() {
  const network=WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const [token,setToken]=useState<string | null>(null);

  return (
    <>
    <ConnectionProvider endpoint={"https://solana-mainnet.g.alchemy.com/v2/yBzlkWFR7LyZlmSKMjCBgTJEYK9LIktp"}>
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <div className='flex justify-between p-6'>

        <WalletMultiButton/>
        <WalletDisconnectButton/>
        </div>
        <div>
          <TokenLaunchPad onTokenCreate={(tokenMint)=>{setToken(tokenMint)}}/>
        </div>

      </WalletModalProvider>

    </WalletProvider>

    </ConnectionProvider>
      
    </>
  )
}

export default App
