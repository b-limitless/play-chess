import { Button } from '../../components/button';
import './welcome.scss';

interface IWelcome {
  setStartGame: Function;
}
export default function Welcome({setStartGame}: IWelcome) {
  return (
    <div className="welcome">
        <h1>Welcome to chess game</h1>
        <h3>Press continue to start the game</h3>
        <Button variant='primary' type='square' onClick={setStartGame}>
            <>Continue</>
        </Button>

    </div>
  )
}
