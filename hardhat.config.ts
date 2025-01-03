import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
require("dotenv").config();

// Load environment variables from .env file
const MONAD_RPC_URL = process.env.MONAD_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const MONAD_CHAIN_ID = Number(process.env.MONAD_CHAIN_ID || "0");
const MONAD_EXPLORER_URL = process.env.MONAD_EXPLORER_URL || "";

// Debug environment variables (optional)
console.log("MONAD_RPC_URL:", MONAD_RPC_URL);
console.log("PRIVATE_KEY:", PRIVATE_KEY ? "Loaded" : "Not Loaded");
console.log("MONAD_CHAIN_ID:", MONAD_CHAIN_ID);
console.log("MONAD_EXPLORER_URL:", MONAD_EXPLORER_URL);

if (!MONAD_RPC_URL || !PRIVATE_KEY || !MONAD_CHAIN_ID || !MONAD_EXPLORER_URL) {
    throw new Error("Missing required environment variables. Please check your .env file.");
}

const config: HardhatUserConfig = {
    solidity: "0.8.27",
    networks: {
        monadDevnet: {
            url: MONAD_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: MONAD_CHAIN_ID,
        },
    },
    etherscan: {
        apiKey: `DUMMY_VALUE_FOR_BLOCKSCOUT`,
        customChains: [
            {
                network: "monadDevnet",
                chainId: MONAD_CHAIN_ID,
                urls: {
                    browserURL: MONAD_EXPLORER_URL,
                    apiURL: `${MONAD_EXPLORER_URL}/api`,
                },
            },
        ],
    },
};

export default config;