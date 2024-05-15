import { ChessInstance } from "chess.js";
import { EDifficultLevel } from "../interfaces/chess.interface";

// Define a function to handle the computer's move
export const generateComputerMove = (
  chess: ChessInstance,
  difficulty: EDifficultLevel
) => {
  const moves = chess.moves();

  if (difficulty === EDifficultLevel.Easy) {
    // Easy: Random move
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  } else if (difficulty === EDifficultLevel.Medium) {
    // Medium: Simple heuristic move (capture if possible)
    const captureMoves = moves.filter((move) => move.includes("x"));
    if (captureMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * captureMoves.length);
      return captureMoves[randomIndex];
    }
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  } else if (difficulty === EDifficultLevel.Hard) {
    // Hard: Minimax or Stockfish integration
    // Implement a minimax algorithm or use a chess engine like Stockfish for stronger moves.
    // This is a placeholder for demonstration purposes.
    const move = minimaxMove(chess, 3); // Example depth of 3
    return move;
  }
};

const minimaxMove = (chess: ChessInstance, depth: number) => {
  // Implement the minimax algorithm with depth control
  // This is a simplified placeholder version
  const moves = chess.moves();
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};
