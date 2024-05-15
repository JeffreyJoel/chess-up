"use client";
import Footer from "@/components/common/Footer";
import { SVGProps, useState } from "react";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@/components/ui/button";
import { getChessUpContract } from "@/constants/contracts";
import { getProvider } from "@/constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";

export default function Levels() {
  const [level, setLevel] = useState(0);
  let content;

  const router = useRouter()

  const { walletProvider } = useWeb3ModalProvider();

  const { address } = useWeb3ModalAccount();

  const readWriteProvider = getProvider(walletProvider);

  const createGame = async (level: Number) => {
    const signer = readWriteProvider
      ? await readWriteProvider.getSigner()
      : null;
    const contract = getChessUpContract(signer);

    const tx = await contract.createGame(0, address, level);
    const receipt = await tx.wait()

    console.log(receipt);
    if(receipt.status === 1){
      router.push(`/play/${receipt.hash}?${level}`)
    }
    
  };

  switch (level) {
    case 0:
      content = (
        <Flex maxWidth={"650px"} direction="column" gap={"4"}>
          <div>
            <Image
              src={"/images/chess.jpeg"}
              alt="Chess"
              height={250}
              width={650}
              className="rounded-lg"
            />
          </div>

          <p className="text-white text-xl">
            {
              "Chess is a two-player strategy board game that is believed to have originated in India in the 6th century AD. The game is played on an 8x8 grid and is one of the most popular games in the world."
            }
          </p>
          <div className="h-[350px] w-full">
            <LiteYouTubeEmbed
              id={"fKxG8KjH1Qg"}
              title={"How to Play Chess"}
              className="rounded-lg"
            />
          </div>
        </Flex>
      );
      break;
    case 1:
      content = (
        <Flex direction={"column"} gap={"8"}>
          <h1 className="text-white text-3xl font-bold">Beginner Level</h1>
          <p className="text-white text-xl">
            Before you embark on your chess journey, let's lay the foundation
            with the Beginner level. This is where you'll learn the basics and
            sharpen your skills. Once you conquer this level, you'll unlock the
            gateway to greater challenges and rewards. Win at this level, and
            you'll be proudly awarded an NFT symbolizing your checkmate victory,
            a token of your progress and dedication!
          </p>
          <Button
            className="w-48 bg-white hover:text-white hover:border-white hover:border  text-gray-900 text-xl font-bold"
            onClick={() => {
              createGame(0);
            }}
          >
            Play
          </Button>
        </Flex>
      );
      break;
    case 2:
      content = (
        <Flex direction={"column"} gap={"8"}>
          <h1 className="text-white text-3xl font-bold">Intermediate Level</h1>
          <p className="text-white text-xl">
            Welcome to the Intermediate level, where your chess prowess will
            truly be put to the test. Here, you'll face more complex strategies
            and tactics, pushing your skills to the next level. Overcoming this
            challenge will not only prove your mettle but also earn you an
            exclusive NFT as a testament to your checkmate victory. Are you
            ready to rise to the occasion and claim your reward?
          </p>
          <Button
            className="w-48 bg-white hover:text-white hover:border-white hover:border  text-gray-900 text-xl font-bold"
            onClick={() => {
              createGame(1);
            }}
          >
            Play
          </Button>
        </Flex>
      );
      break;
    case 3:
      content = (
        <Flex direction={"column"} gap={"8"}>
          <h1 className="text-white text-3xl font-bold">Advanced Level</h1>
          <p className="text-white text-xl">
            Prepare yourself for the ultimate test of skill and strategy at the
            Advanced level. Only those with a deep understanding of the game can
            hope to succeed here. Your victory at this level will not go
            unnoticed—you'll be awarded a prestigious NFT commemorating your
            checkmate triumph, a symbol of your mastery in the world of chess.
            Are you up for the challenge?
          </p>
          <Button
            className="w-48 bg-white text-gray-900 hover:text-white  text-xl hover:border-white hover:border  font-bold"
            onClick={() => {
              createGame(2);
            }}
          >
            Play
          </Button>
        </Flex>
      );
      break;
    case 4:
      content = (
        <Flex direction={"column"} gap={"8"}>
          <h1 className="text-white text-3xl font-bold">Expert Level</h1>
          <p className="text-white text-xl">
            Here, you'll face off against the best of the best, where every move
            counts and every decision shapes the outcome. If you emerge
            victorious at this level, you'll not only earn the admiration of
            your peers but also receive an exclusive NFT celebrating your
            checkmate achievement. Are you ready to make history and claim your
            rightful place among the chess elite?
          </p>
          <Button className="w-48 bg-white text-gray-900 hover:text-white hover:border-white hover:border text-xl font-bold"
          onClick={()=>{
            createGame(3)
          }}
          >
            Play
          </Button>
        </Flex>
      );
      break;
    default:
      content = (
        <Flex maxWidth={"650px"} direction="column" gap={"4"}>
          <div>
            <Image
              src={"/images/chess.jpeg"}
              alt="Chess"
              height={250}
              width={650}
              className="rounded-lg"
            />
          </div>

          <p className="text-white text-xl">
            {
              "Chess is a two-player strategy board game that is believed to have originated in India in the 6th century AD. The game is played on an 8x8 grid and is one of the most popular games in the world."
            }
          </p>
          <div className="h-[350px] w-full">
            <LiteYouTubeEmbed
              id={"fKxG8KjH1Qg"}
              title={"How to Play Chess"}
              className="rounded-lg"
            />
          </div>
        </Flex>
      );
  }

  return (
    <>
      <div className="bg-homeBack">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 py-12">
          <div className="relative">
            <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg">
              <div className="flex justify-center">{content}</div>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Levels</h2>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4"
                onClick={() => setLevel(0)}
              >
                <BaselineIcon className="h-8 w-8 text-white" />
                <span className="text-white font-medium">How to play</span>
              </div>
              <div
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4"
                onClick={() => setLevel(1)}
              >
                <BaselineIcon className="h-8 w-8 text-white" />
                <span className="text-white font-medium">Beginner</span>
              </div>
              <div
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4"
                onClick={() => setLevel(2)}
              >
                <SignalMediumIcon className="h-8 w-8 text-white" />
                <span className="text-white font-medium">Intermediate</span>
              </div>
              <div
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4"
                onClick={() => setLevel(3)}
              >
                <ForwardIcon className="h-8 w-8 text-white" />
                <span className="text-white font-medium">Advanced</span>
              </div>
              <div
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4"
                onClick={() => setLevel(4)}
              >
                <UserIcon className="h-8 w-8 text-white" />
                <span className="text-white font-medium">Expert</span>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#1a2a6c] to-[#b21f1f] h-2 opacity-20" />
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#1a2a6c] to-[#b21f1f] h-1 opacity-10" />
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#1a2a6c] to-[#b21f1f] h-0.5 opacity-5" />
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#1a2a6c] to-[#b21f1f] h-0.5 opacity-2" />
      </div>
      <Footer />
    </>
  );
}

function BaselineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16" />
      <path d="m6 16 6-12 6 12" />
      <path d="M8 12h8" />
    </svg>
  );
}

function ForwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
    </svg>
  );
}

function PuzzleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
}

function SignalMediumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
    </svg>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
