"use client";

import {
  GelatoRelay,
  SponsoredCallERC2771Request,
  TransactionStatusResponse,
} from "@gelatonetwork/relay-sdk";
import abi from "../utils/abi.json";
import { ethers } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProvider } from "@/constants/providers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const relay = new GelatoRelay();

relay.onTaskStatusUpdate((taskStatus) => {
  console.log("Task status update", taskStatus);
});

// Set up on-chain variables, such as target address
const CONTRACT_ADDRESS = `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`;
const API_KEY = `${process.env.NEXT_PUBLIC_GELATO_API_KEY}`;

function useGaslessChess() {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const provider = getProvider(walletProvider);
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const router = useRouter();

  useEffect(() => {
    async function setup() {
      let nSigner = await provider.getSigner();
      setSigner(nSigner);
      let nContract = new ethers.Contract(CONTRACT_ADDRESS, abi, nSigner);
      setContract(nContract);
    }
    setup();
  }, [provider]);

  async function createGame(_mode, _participant, _bot) {
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
    contract.on("GameCreated", (_player1, _player2, _gameId) => {
      console.log(_player1, _player2, _gameId);
      router.push(`/play/${_gameId}?level=${_bot}`);
    });
  }

  async function move(_gameId, _fen, _halfMove, _move) {
    const { data } = await contract.move.populateTransaction(
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
    const { data } = await contract.endGame.populateTransaction(
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
