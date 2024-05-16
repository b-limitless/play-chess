import { useMemo, useState } from 'react';
import { Button } from '../../components/button';
import RoobotSVG from '/svg/robot.svg';

import './welcome.scss';



interface IWelceom {
  setStartGame:Function;
}
const Welceom = () => {
 const [darkMode, setDarkMode] = useState<boolean>(true);

  // Without even changing was re-rendering 4 times
  // Therefore using memo to memotize the value
  const darkModeMemo = useMemo(() => darkMode, [darkMode])

  return (
    <div className={`app ${darkModeMemo ? 'dark-mode' : ''}`}>
      <div className="wrapper">
        <div className={`col js-center ${darkMode ? 'dark-mode' : ''}`}>
          
          <div className="row chessboard">
            <img src='/img/chess.png' width={400} alt='chessboard'/>
          </div>
          
        </div>
        <div className={`col js-center ${darkMode ? 'dark-mode' : ''}`}>
  
          <Button type='square' variant='primary'>React Chessboard</Button>
          <div className="robot">
            <img src='/svg/robot.svg' width={300} className={darkMode ? '' : 'dark-mode'}/>
          </div>
          
          <div className="actions">
            <div className="accept">Accept the challenge</div>
            <h1>Let's play</h1>
            <div className="row">
              <Button 
                addStyles='br-5 dott-border'
                variant='yellow' 
                type='square'
              >
                Play
              </Button>
            </div>
            
            <div className="actions">
              <div className="title">Theme</div>
              <div className={`actions-buttons welcome ${darkMode ? 'dark-mode' : ''}`}>
                <Button
                  addStyles='br-5'
                  type='square'
                  variant='dark__3'
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </div>
              <div className='test'>Dark Mode</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
  
};
export default Welceom;