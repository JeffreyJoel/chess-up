"use client";
import { getFen, aiMove } from "js-chess-engine";
import Fen from "chess-fen/dist/Fen";

function useBoardActions(
  boardEngine,
  board,
  setPieces,
  setDElement,
  Check,
  Checkmate,
  Capture,
  Move,
  Illegal
) {
  function handleMoves(_fro, _to) {
    // console.log(_fro, _to);
    const from = _fro;
    const to = _to;
    const capt = board.isEmpty(to);
    console.log(boardEngine);
    try {
      if (boardEngine.move(from, to)) {
        let farr = getFen(boardEngine.board.configuration);
        // console.log(farr)
        setPieces(new Fen(farr));

        if (boardEngine.board.configuration.checkMate) {
          Checkmate.current.play();
        } else if (boardEngine.board.configuration.check) {
          Check.current.play();
        } else if (!capt) {
          Capture.current.play();
        } else {
          Move.current.play();
        }
        // if (boardEngine.board.configuration.turn === "black") {
        //     nextMove();
        // }
        setDElement(undefined);
      }
    } catch (error) {
      console.log(error);
      Illegal.current.play();
    }
  }

  function nextMove() {
    const move = aiMove(boardEngine.board.configuration);
    handleMoves(Object.keys(move)[0], move[Object.keys(move)[0]]);
  }

  return { handleMoves, nextMove };
}
export default useBoardActions;