import React, { useState } from 'react';
import './app.scss';
import ChessBoardComponent from './chessboard';
import './styles/main.scss';
import Welcome from './layouts/welcome/welcome';


const App: React.FC = () => {
  
  // // Without even changing was re-rendering 4 times
  // // Therefore using memo to memotize the value
  // const darkModeMemo = useMemo(() => darkMode, [darkMode])
  const [startGame, setStartGame] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (

    <>
      {/* <Header
        darkModeOnChangeHandler={darkModeOnChangeHandler}
      /> */}
       {!startGame && <Welcome darkMode={darkMode} setDarkMode={setDarkMode}/>}
      {startGame && <ChessBoardComponent darkMode={darkMode} setDarkMode={setDarkMode}/>}
    </>

  );
};
export default App;