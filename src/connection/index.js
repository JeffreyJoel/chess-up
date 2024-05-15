"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN = 4202;

export const SEPOLIA_ID = 4202;



const LiskSepolia = {
  chainId: SEPOLIA_ID,
  name: "Lisk sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia-blockscout.lisk.com",
  rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
};

const metadata = {
  name: "ChessUp: Strategy Meets the Blockchain",
  description:  `In the world of digital board games, OnChain Chess stands out by
  integrating the timeless game of chess with the cutting-edge
  technology of blockchain. This is not just a game; it&apos;s an
  experience, a community, and a new chapter in the world of
  decentralized gaming.`,
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// const ethersConfig = defaultConfig({
//     metadata
//   })

// 5. Create a Web3Modal instance
export const configureWeb3Modal = () =>
createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [LiskSepolia],
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  enableAnalytics: false, // Optional - defaults
  themeVariables: {
    "--w3m-accent": "#006AFF",
    "--w3m-border-radius-master": "",
    "--w3m-font-size-master": "16",
  },
});

export function Web3Modal({ chcreateWeb3Modalildren }) {
  return children;
}