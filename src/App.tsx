import { Suspense, use } from 'react'
import './App.scss'
import Card from './components/Card'
import api from './api/api'

interface IFilmData {
  results: {
    title: string;
    episode_id: number;
    director: string;
    release_date: string;
  }[]
}

const Films = ({promise}: {promise: Promise<IFilmData | null>}) => {
  //TODO add to session
  const films = use(promise)
  return JSON.stringify(films)
}

function App() {
  return (
    <>
      Hello World! Welcome to Star wars
      <Card title={'hello this is a tile'} />
      <Suspense fallback={<div>loading</div>}>
        <Films promise={api(`https://swapi.dev/api/films`)}  />
      </Suspense>
    </>
  )
}

export default App
