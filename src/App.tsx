// import { Suspense, use, useState } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import gameStore from './gameLogic/reducer/gameStore'
import Container from './molecules/container'

function App() {
  return (
    <>
      <Provider store={gameStore}>
        <Container />
      </Provider>
    </>
  )
}

export default App
