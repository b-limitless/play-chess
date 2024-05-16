import { useMemo } from 'react';
import { Button } from '../../components/button';

import { IMode } from '../../interfaces/chess.interface';
import './welcome.scss';

interface IWelceom extends IMode {
  setStartGame: Function;
}


const Welceom = ({ darkMode, setDarkMode, setStartGame }: IWelceom) => {

  // Without even changing was re-rendering 4 times
  // Therefore using memo to memotize the value
  const darkModeMemo = useMemo(() => darkMode, [darkMode])

  return (
    <div className={`app ${darkModeMemo ? 'dark-mode' : ''}`}>
      <div className="wrapper">
        <div className={`col js-center ${darkMode ? 'dark-mode' : ''}`}>

          <div className="row chessboard">
            <img src='/img/chess.png' width={400} alt='chessboard' />
          </div>

        </div>
        <div className={`col js-center ${darkMode ? 'dark-mode' : ''}`}>

          <Button type='square' variant='primary'>React Chessboard</Button>
          <div className="robot">
            <img alt='' src='/svg/robot.svg' width={300} className={darkMode ? '' : 'dark-mode'} />
          </div>

          <div className="actions">
            <div className="accept">Accept the challenge</div>
            <h1>Let's play</h1>
            <div className="row">
              <Button
                addStyles='br-5 dotted-border '
                variant='yellow'
                type='square'
                onClick={() => setStartGame(true)}
              >
                Play
              </Button>
            </div>

            <div className="actions">
              <div className="title mt-10">Theme</div>
              <div className={`actions-buttons welcome`}>
                <Button
                  addStyles='br-5'
                  type='square'
                  variant='dark__3'
                  onClick={() => setDarkMode((prevState: boolean) => !darkMode)}
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );

};
export default Welceom;