import React from 'react'
import { Button } from '../../components/button'

export default function Welcome() {
  return (
    <div className="welcome">
        <h1>Welcome to chess game</h1>
        <h3>Press start to continue</h3>
        <Button variant='primary' type='square'>
            <>Continue</>
        </Button>

    </div>
  )
}
