//https://tyler-reicks.medium.com/create-a-chess-game-with-react-and-chessboardjsx-%EF%B8%8F-128d1995a743
import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove, Chess } from "chess.js";

interface ISquareStyling {
  pieceSquare: any;
  history:any;
}

const squareStyling = ({ pieceSquare, history }: ISquareStyling) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    // Set initial state to FEN layout
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(chess.fen());
  const [squareStyles, setSquareStyles] = useState<any>({}); 
  const [pieceSquare, setPieceSquare] = useState<any>({});
  const [history, setHistory] = useState<any>([]);
  const [dropSquareStyle, setDropSquareStyle] = useState<any>({});

  // Logic for the setting up the random computer move.
  const handleMove = (move: ShortMove) => {
    // Line 29 validates the user move.

    
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        if(chess.game_over() || chess.in_draw() || moves.length === 0) {
          console.log('the game is over'); 
          return;
        } else {
          console.log('game is not over')
        }

        // Lines 33-28: Computer random move.
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
      // Sets state of chess board
      setFen(chess.fen());
    }
  };

  const highlightSquare = (sourceSquare: any, squaresToHighlight: any) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          [c]: {
            background: "radial-gradient(circle, #fffc00 36%, transparent 40%)",
            borderRadius: "50%"
          }
        };
      },
      {}
    );
  
    setSquareStyles((prevStyles: any) => ({
      ...prevStyles,
      ...highlightStyles
    }));
  };
  
  const onDragOverSquare = (square:any) => {
    setDropSquareStyle(
      
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    );
  };

  const onSquareClick = (square:any) => {
    setSquareStyles(squareStyling({ pieceSquare: square, history }))

    let move = chess.move({
      from: pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    setFen(chess.fen());
    setPieceSquare('');
    setHistory(chess.history({verbose: true}))
  };


  // keep clicked square style and remove hint squares
  const removeHighlightSquare = (square:any) => {
    setSquareStyles(squareStyling({ pieceSquare, history }))
  };

  const onMouseOutSquare = (square:any) => removeHighlightSquare(square);

  const onMouseOverSquare = (square:any) => {
    console.log('Hello world');
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

  return (
    <div className="flex-center">
      <h1>Random Chess Game</h1>
      <Chessboard
        width={400}
        position={fen}
        // onDrop prop tracks every time a piece is moved.
        // The rest is handled in the the handleMove function.
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            // This promotion attribute changes pawns to a queen if they reach the other side of the board.
            promotion: "q",
          })
        }
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
        }}
        squareStyles={squareStyles}
        dropSquareStyle={dropSquareStyle}
        onDragOverSquare={onDragOverSquare}
        onSquareClick={onSquareClick}
        onMouseOutSquare= {onMouseOutSquare}
        onMouseOverSquare={onMouseOverSquare}
      />
     
    </div>
  );
};
export default App;