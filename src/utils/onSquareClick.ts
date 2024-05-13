import { ChessInstance } from "chess.js";

export const onSquareClick = (square: any, 
         setSquareStyles:Function, 
         squareStyling:any, chess:ChessInstance, 
         pieceSquare:any, 
         history:any
        ) => {

    setSquareStyles(squareStyling({ pieceSquare: square, history }))

    let move = chess.move({
      from: pieceSquare,
      to: square,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    // setFen(chess.fen());
    // setPieceSquare('');
    // setHistory(chess.history({ verbose: true }))
  };