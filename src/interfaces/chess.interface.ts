import { Square } from "chess.js";

export interface SquareStyles {
  [key: string]: React.CSSProperties; // CSS properties for each square
}

export interface PieceSquare {
  [key: string]: Square | null; // Piece at each square
}

export interface Move {
  from: Square;
  to: Square;
  piece: string;
}

// Define your own type for the history array
export interface ChessHistoryItem {
  from: Square;
  to: Square;
  piece: string;
}

export interface DropSquareStyle {
  [key: string]: React.CSSProperties; // CSS properties for drop squares
}

export interface GameHistoryItem {
  from: Square;
  to: Square;
  piece: string;
  team: string; // Assuming 'team' represents the player's team (e.g., 'white' or 'black')
}
