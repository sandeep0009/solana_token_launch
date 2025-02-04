import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptAccount, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TokenLaunchPadProps {
    onTokenCreate: (mintAddress: PublicKey) => void;
}

export const TokenLaunchPad: React.FC<TokenLaunchPadProps> = ({ onTokenCreate }) => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const createToken = async () => {
        if (!wallet.publicKey) {
            console.error("Wallet not connected");
            return;
        }

        try {
            const mintKeyPair = Keypair.generate();
            const lamports = await getMinimumBalanceForRentExemptAccount(connection);

            const trnx = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeyPair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId: TOKEN_PROGRAM_ID
                }),
                createInitializeMint2Instruction(mintKeyPair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
            );

            trnx.feePayer = wallet.publicKey;
            trnx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            trnx.partialSign(mintKeyPair);

            await wallet.sendTransaction(trnx, connection);

            console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`);
            onTokenCreate(mintKeyPair.publicKey);

        } catch (error) {
            console.error("Error creating token:", error);
        }
    };

    return (
        <div className="flex justify-center items-center rounded-full">
            <div className="max-w-md w-full flex flex-col items-center shadow-lg text-center p-8 border border-slate-500 rounded-md">
                <h2 className="text-2xl font-normal mb-4">Token Launch Pad</h2>
                
                <div className="mb-2 w-full">
                    <Input placeholder="Enter name" type="text" />
                </div>
                <div className="mb-2 w-full">
                    <Input placeholder="Enter symbol" type="text" />
                </div>
                <div className="mb-2 w-full">
                    <Input placeholder="Image URL" type="text" />
                </div>
                <div className="mb-2 w-full">
                    <Input placeholder="Initial supply" type="text" />
                </div>
                
                <Button className="w-full mt-4" onClick={createToken}>
                    Create Token
                </Button>
            </div>
        </div>
    );
}    