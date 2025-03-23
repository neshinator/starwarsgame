import useFilmData from "../hooks/useFilmData"
import { useSelector } from "react-redux"
import NewGame from "./newGame"
import Level from "./level"

const Container = () => {
    const {films, isLoading} = useFilmData()
    const isPlaying = useSelector((state) => state.isPlaying.value)

    if (!isPlaying){
        return <NewGame />
    }
    // TODO refactor this to use Suspense?
    // TODO check for errored api call and so 'films' will be null
    return <div>
        {isLoading ? '...loading' : <Level films={films ?? []} />}
    </div>
  }

  export default Container