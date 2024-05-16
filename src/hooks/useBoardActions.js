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
  Illegal,
  moves,
  setMoves,
  _gameId,
  level,
  setIsCheckmate
  // gaslessChess
) {
  async function handleMoves(_fro, _to) {
    // console.log(_fro, _to);
    const from = _fro;
    const to = _to;
    const capt = board.isEmpty(to);
    console.log(boardEngine);
    if (boardEngine.board.configuration.checkMate) {
      Checkmate.current.play();
      setIsCheckmate(true);
    } else {
      try {
        if (boardEngine.move(from, to)) {
          let farr = getFen(boardEngine.board.configuration);
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

          console.log(boardEngine.board.history.length);
          let move = moves;
          if (
            move[parseInt((boardEngine.board.history.length - 1) / 2)] !==
            undefined
          ) {
            move[parseInt((boardEngine.board.history.length - 1) / 2)].push(
              _to
            );
          } else {
            move[parseInt((boardEngine.board.history.length - 1) / 2)] = [_to];
          }

          setMoves(move);
          setDElement(undefined);
        }
      } catch (error) {
        console.log(error);
        if (capt) {
          Illegal.current.play();
        }
      }
    }
  }

  function nextMove() {
    const move = aiMove(boardEngine.board.configuration, Number(level));
    handleMoves(Object.keys(move)[0], move[Object.keys(move)[0]]);
  }

  return { handleMoves, nextMove };
}
export default useBoardActions;
