import { ChessInstance } from "chess.js";

export const onMouseOverSquare = (chess:ChessInstance,  square: any, highlightSquare:Function) => {

    // get list of possible moves for this square
    let moves = chess.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };