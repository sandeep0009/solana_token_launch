import { createAssociatedTokenAccountInstruction, createMintToInstruction,  getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { Input } from "./ui/input";
import { Button } from "./ui/button";



interface MintTokenProps{
    mintAddress:PublicKey;
    onDone:()=>void
}

export const MintToken=({mintAddress,onDone}:MintTokenProps)=>{
    const wallet=useWallet();
    const {connection}=useConnection();
    const mintFunction=async()=>{
        if(!wallet.publicKey){
            console.log("connect to wallet first");
            return;
        }
        const associatedToken=getAssociatedTokenAddressSync(
            mintAddress,
            wallet.publicKey,
            false,
            TOKEN_PROGRAM_ID

        );
        console.log(associatedToken.toBase58());

        const trnx=new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintAddress,
                TOKEN_PROGRAM_ID
            )
        );

        await wallet.sendTransaction(trnx,connection);
        const mintToken=new Transaction().add(
            createMintToInstruction(mintAddress,associatedToken,wallet.publicKey,1000000000,[],TOKEN_PROGRAM_ID),
        );

        await wallet.sendTransaction(mintToken,connection);
        console.log("Minting done for token " + mintAddress.toBase58())
        onDone()
    }
    return(

        <div>

            <Input placeholder="text"/>
            <Button onClick={mintFunction}>Mint Token</Button>
        </div>

    )
}