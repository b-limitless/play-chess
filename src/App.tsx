import { Chess, ChessInstance } from 'chess.js';
import Chessboard from 'chessboardjsx';
import React, { useMemo, useState } from 'react';
import './styles/main.scss';
import './app.scss';
import Table from './components/table/table';
import Welcome from './layouts/welcome/welcome';
import { Button } from './components/button';
import Header from './layouts/header/header';
import { squareStyling } from './utils/squareStyling';
import { generateComputerMove } from './utils/generateComputerMove';
import { handleResign } from './utils/handleResign';
import { onMouseOverSquare } from './utils/onMouseOverSquare';
import { DropSquareStyle, GameHistoryItem, Move, PieceSquare, SquareStyles } from './interfaces/chess.interface';

enum ETeam {
  Black = 'black',
  White = 'white'
}

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    // Set initial state to FEN layout
    new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  );
  const [fen, setFen] = useState(chess.fen());
  const [squareStyles, setSquareStyles] = useState<SquareStyles>({});
  const [pieceSquare, setPieceSquare] = useState<any>({})
  const [history, setHistory] = useState<Move[]>([]);
  const [dropSquareStyle, setDropSquareStyle] = useState<any>({});

  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Logic for the setting up the random computer move.
  const handleMove = (move: any) => {
    // Line 29 validates the user move.
    
    if (chess.turn() === 'w') {
      const { from, to, piece } = move;
       setGameHistory(prevHistory => [...prevHistory, { from, to, piece, team: ETeam.White }]);
    }
    
    const isMoved = chess.move(move);
    if (isMoved) {
      setTimeout(() => {
        const moves = chess.moves();
        if (chess.game_over() || chess.in_draw() || moves.length === 0) {
          setGameHistory([]);
          return;
        }

        // Lines 33-28: Computer random move.
        if (moves.length > 0) {
          const computerMove = generateComputerMove(chess);

          const moveComputer = chess.move(computerMove);

          const { from, to, piece } = moveComputer as any;
          setGameHistory(prevHistory => [...prevHistory, { from, to, piece, team: ETeam.Black }]);

          setFen(chess.fen());
        }
      }, 300);
      // Sets state of chess board
      setFen(chess.fen());
      
    } else {
      console.log('even running')
      setGameHistory(prevHistory => prevHistory.slice(0, -1));

  
    }
  };

  const highlightSquare = (sourceSquare: any, squaresToHighlight: any) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          [c]: {
            background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
            borderRadius: '50%'
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

  const onDragOverSquare = (square: any) => {
    setDropSquareStyle(

      square === 'e4' || square === 'd4' || square === 'e5' || square === 'd5'
        ? { backgroundColor: 'cornFlowerBlue' }
        : { boxShadow: 'inset 0 0 1px 4px rgb(255, 255, 0)' }
    );
  };

  const onSquareClick = (square: any) => {

    setSquareStyles(squareStyling({ pieceSquare: square, history }))

    let move = chess.move({
      from: pieceSquare,
      to: square,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    setFen(chess.fen());
    setPieceSquare('');
    setHistory(chess.history({ verbose: true }))
  };


  // keep clicked square style and remove hint squares
  const removeHighlightSquare = (square: any) => {
    setSquareStyles(squareStyling({ pieceSquare, history }))
  };

  const onMouseOutSquare = (square: any) => removeHighlightSquare(square);

  const onDrop = (move: any) => {
    console.log('ondrop', 'running ondrop')

    const moveObject = {
      from: move.sourceSquare,
      to: move.targetSquare,
      piece: move.piece,

      // This promotion attribute changes pawns to a queen if they reach the other side of the board.
      promotion: 'q',
    };
    //  setGameHistory([...gameHistory, moveObject]);

    handleMove(moveObject)
  }

  const darkModeOnChangeHandler = (e: any) => {
    setDarkMode(prevState => !prevState);
  }

  // Without even changing was re-rendering 4 times
  // Therefore using memo to memotize the value
  const darkModeMemo = useMemo(() => darkMode, [darkMode])

  return (
    <div className={`app ${darkModeMemo ? 'dark-mode' : ''}`}>

      <Header
        darkModeOnChangeHandler={darkModeOnChangeHandler}
      />
      <div className='container'>
        {!startGame && <Welcome setStartGame={setStartGame}/>}

        {startGame && <section className='game'>
          <div className='col'>
            <Chessboard
            
              width={400}
              position={fen}
              // onDrop prop tracks every time a piece is moved.
              // The rest is handled in the the handleMove function.
              onDrop={onDrop}
              boardStyle={{
                borderRadius: '5px',
                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
              }}
              squareStyles={squareStyles}
              dropSquareStyle={dropSquareStyle}
              onDragOverSquare={onDragOverSquare}
              onSquareClick={onSquareClick}
              onMouseOutSquare={onMouseOutSquare}
              onMouseOverSquare={(square) => onMouseOverSquare(chess, square, highlightSquare)}
            />

            <Button type='round' variant='primary' onClick={() => handleResign(chess, setFen, setGameHistory)}>Resign</Button>
          </div>

          <div className='col'>
            <Table data={gameHistory} />
          </div>

        </section>}
      
      
      </div>
    </div>

  );
};
export default App;