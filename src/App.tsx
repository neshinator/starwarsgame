// import { Suspense, use, useState } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import {store} from './gameLogic/reducer/gameStore'
import Container from './molecules/container'
import BackgroundContainer from './components/BackgroundContainer'

function App() {
  return (
      <Provider store={store}>
        <BackgroundContainer>
          <Container />
        </BackgroundContainer>
      </Provider>
  )
}

export default App
