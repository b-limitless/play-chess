import React from 'react'
import { Button } from '../../components/button'; 
import './welcome.scss';

export default function Welcome() {
  return (
    <div className="welcome">
        <h1>Welcome to chess game</h1>
        <h3>Press continue to start the game</h3>
        <Button variant='primary' type='square'>
            <>Continue</>
        </Button>

    </div>
  )
}
