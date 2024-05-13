import { ChessInstance } from "chess.js";

export const handleResign = (chess:ChessInstance, setFen:Function, setGameHistory: Function) => {
    chess.reset();
    setFen(chess.fen());
    setGameHistory([]);
  }
  