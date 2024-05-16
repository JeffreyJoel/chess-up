"use client";
import Fen from "chess-fen/dist/Fen";
import Square from "../../../components/Square";
import { useEffect, useState, useRef } from "react";
import { BOARD_CONTENT, BoardContent } from "chess-fen";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import useBoardActions from "../../../hooks/useBoardActions";
import { Game } from "js-chess-engine";
import { Button } from "@/components/ui/button";
import useGaslessChess from "@/hooks/useGaslessChess";
import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Image from "next/image";
import CheckmateModal from "@/components/play/CheckmateModal";

export default function Arena() {
  const { address } = useWeb3ModalAccount();
  const [draggedElement, setDElement] =
    useState<[EventTarget, BoardContent, HTMLDivElement]>();
  const [moves, setMoves] = useState<string[][]>(new Array(100));
  const [isCheckmate, setIsCheckMate] = useState(false);
  const [pieces, setPieces] = useState<Fen>(new Fen(Fen.startingPosition));
  const gaslessChess = useGaslessChess();
  const params = useParams<{ id: string }>();
  const gameType = params;
  // console.log(gameType);
  const searchParams = useSearchParams();

  const [level, setLevel] = useState<string>();

  const Move = useRef<any>();
  const Illegal = useRef<any>();
  const Capture = useRef<any>();
  const Check = useRef<any>();
  const Checkmate = useRef<any>();
  const [colors, setColors] = useState<string[]>([]);
  const [pics, setPics] = useState<any>();
  const [boardEngine] = useState<Game>(new Game());
  const [BoardActions] = useState(
    useBoardActions(
      boardEngine,
      pieces,
      setPieces,
      setDElement,
      Check,
      Checkmate,
      Capture,
      Move,
      Illegal,
      moves,
      setMoves,
      gameType.id,
      searchParams.get("level"),
      setIsCheckMate
    )
  );

  useEffect(() => {
    const queryValue = searchParams.get("level");

    switch (Number(queryValue)) {
      case 0:
        setLevel("AbidoShaker");
        setColors(["bg-[#4a7398]", "bg-[#ebe8d2]"]);
        setPics("/images/gandusa-gandusa.jpeg");
        break;
      case 1:
        setLevel("GandukaGandusa");
        setColors(["bg-[#739552]", "bg-[#eaecd1]"]);
        setPics("/images/lemasepre.jpeg");
        break;
      case 2:
        setLevel("Lamante");
        setColors(["bg-[#b98662]", "bg-[#edd6b0]"]);
        setPics("/images/pahose.jpeg");
        break;
      case 3:
        setLevel("Indaboski");
        setColors(["bg-[#bb5746]", "bg-[#f5dbc3]"]);
        setPics("/images/Abidosaker.jpeg");
        break;
      default:
        setLevel("Unknown Player"); // or some other default value
        setColors(["bg-[#739552]", "bg-[#eaecd1]"]);
    }
  }, []);

  useEffect(() => {
    if (draggedElement === undefined) {
      if (
        boardEngine.board.configuration.turn === "black" &&
        !boardEngine.board.configuration.checkMate
      ) {
        setTimeout(() => {
          BoardActions.nextMove();
          console.log(moves);
        }, 1000);
      }
    }
  }, [
    BoardActions,
    boardEngine.board.configuration.checkMate,
    boardEngine.board.configuration.turn,
    draggedElement,
  ]);

  useEffect(() => {
    async function handleWin(winner) {
      await gaslessChess.endGame(gameType.id, 3, "http", winner);
    }
    if (isCheckmate && boardEngine.board.configuration.turn === "black") {
      handleWin(address);
    }
    if (isCheckmate && boardEngine.board.configuration.turn === "white") {
      handleWin(ethers.ZeroAddress);
    }
  }, [
    address,
    boardEngine.board.configuration.turn,
    gameType.id,
    gaslessChess,
    isCheckmate,
  ]);

  const handleResign = async () => {
    await gaslessChess.endGame(gameType.id, 3, "http", ethers.ZeroAddress);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#1A2337]">
      <div className="flex flex-row items-stretch justify-center gap-5">
        <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <audio ref={Move} src="/sound/move-self.mp3" />
          <audio ref={Capture} src="/sound/capture.mp3" />
          <audio ref={Illegal} src="/sound/illegal.mp3" />
          <audio ref={Check} src="/sound/move-check.mp3" />
          <audio ref={Checkmate} src="/sound/game-end.webm" />
          <div className="flex flex-row w-[640px] gap-4 items-center border-b border-gray-300 bg-gradient-to-b from-[#111827] pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-t-xl lg:border lg:bg-[#1A2337] lg:p-4 lg:dark:bg-zinc-800/30">
            <Image src={pics} width={24} height={24} alt="levels" />
            <div>
              <p className="text-white">{level}</p>
              <div></div>
            </div>
          </div>

          <div
            className={`z-10 w-[640px] h-[640px] flex flex-row ${"flex-wrap"}`}
          >
            {pieces?.board.map((piece, index) =>
              piece.map((pie, ind) => (
                <Square
                  key={8 * index + ind}
                  piece={pie}
                  index={8 * index + ind}
                  setDElement={setDElement}
                  draggedElement={draggedElement}
                  boardColor={colors}
                  boardActions={BoardActions}
                />
              ))
            )}
          </div>
          <div className="flex flex-row w-[640px] gap-4 items-center border-b border-gray-300 bg-gradient-to-b from-[#111827] pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-b-xl lg:border lg:bg-[#1A2337] lg:p-4 lg:dark:bg-zinc-800/30">
            <div className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"></div>
            <div>
              <p className="text-white">{address}</p>
              <div></div>
            </div>
          </div>
        </div>
        <div className="bg-[#111827] w-[450px] p-12">
          <h3 className="text-white">Moves</h3>
          <div className="h-[500px] scroll-m-0 overflow-y-auto">
            <table>
              <tbody>
                {moves.map((move, index) => (
                  <tr className="gap-5 flex flex-row " key={index}>
                    {" "}
                    <td className="text-white font-semibold italic">
                      {index + 1}.{" "}
                    </td>
                    {move?.map((mov, i) => (
                      <td
                        className="text-white font-semibold italic"
                        key={`${index}${i}`}
                      >
                        {mov}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            className="btn bg-red-600 border-gray-300 w-full mt-3"
            onClick={handleResign}
          >
            Resign
          </Button>
          {isCheckmate && (
            <Button
              className="btn bg-blue-600 border-gray-300 w-full mt-3"
              onClick={handleResign}
            >
              New Bot
            </Button>
          )}
        </div>
      </div>
      {isCheckmate && <CheckmateModal/>}
      
    </main>
  );
}
