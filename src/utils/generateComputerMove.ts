import { ChessInstance } from "chess.js";

// Define a function to handle the computer's move
export const generateComputerMove = (game: ChessInstance): string => {
  // Logic to generate the computer's move goes here
  // For now, let's just choose a random move from the available legal moves
  const moves = game.moves();
  const randomMove = moves[Math.floor(Math.random() * moves?.length)];
  return randomMove;
};
