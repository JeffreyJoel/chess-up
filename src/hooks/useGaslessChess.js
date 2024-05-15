"use client";

import {
  GelatoRelay,
  SponsoredCallERC2771Request,
} from "@gelatonetwork/relay-sdk";
import abi from "../utils/abi.json";
import { ethers } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const relay = new GelatoRelay();

// Set up on-chain variables, such as target address
const CONTRACT_ADDRESS = `"${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
const API_KEY = `${process.env.NEXT_PUBLIC_GELATO_API_KEY}`;

function useGaslessChess() {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  async function createGame(_mode, _participant, _bot) {
    const provider = getProvider(walletProvider);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    const { data } = await contract.createGame.populateTransaction(
      _mode,
      _participant,
      _bot
    );

    // Populate a relay request
    const request = {
      chainId: (await provider.getNetwork()).chainId,
      target: CONTRACT_ADDRESS,
      data: data,
      user: address,
    };

    const relayResponse = await relay.sponsoredCallERC2771(
      request,
      provider,
      API_KEY
    );
    console.log(relayResponse);
  }

  async function move(_gameId, _fen, _halfMove, _move) {
    const provider = getProvider(walletProvider);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    const { data } = await contract.createGame.populateTransaction(
      _gameId,
      _fen,
      _halfMove,
      _move
    );

    // Populate a relay request
    const request = {
      chainId: (await provider.getNetwork()).chainId,
      target: CONTRACT_ADDRESS,
      data: data,
      user: address,
    };

    const relayResponse = await relay.sponsoredCallERC2771(
      request,
      provider,
      API_KEY
    );
    console.log(relayResponse);
  }

  async function endGame(_gameId, _status, _tokenUri, _winner) {
    const provider = getProvider(walletProvider);
    const signer = await provider.getSigner();
    const user = await signer.getAddress();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    const { data } = await contract.createGame.populateTransaction(
      _gameId,
      _status,
      _tokenUri,
      _winner
    );

    // Populate a relay request
    const request = {
      chainId: (await provider.getNetwork()).chainId,
      target: CONTRACT_ADDRESS,
      data: data,
      user: address,
    };

    const relayResponse = await relay.sponsoredCallERC2771(
      request,
      provider,
      API_KEY
    );
    console.log(relayResponse);
  }

  return { createGame, move, endGame };
}

export default useGaslessChess;
