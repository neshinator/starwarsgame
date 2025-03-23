import { useEffect, useState } from "react";
import api from "../api/api";

type TResponseResult = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string,
    characters: string[];
    planets: string[];
    starships: string[];	
    vehicles: string[];
    species: string[];
    created: Date;
    edited: Date;
    url: string;
}

interface IResponse {
    count: number;
    next: null,
    previous: null,
    results: TResponseResult[]
}  

export type IFilmData = Omit<TResponseResult, 'url'>

const mapFilmData = (data: IResponse | null) => data?.results.map(x => ({
        title: x.title,
        episode_id: x.episode_id,
        director: x.director,
        release_date: x.release_date
    } as IFilmData)) ?? null


const useFilmData = () => {
    const [films, setFilms] = useState<IFilmData[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getFilms = async () => {
           const data = await api('https://swapi.dev/api/films') as IResponse
           // testing loading functionality but also waiting a bit actually is a good usability
           // trick (odd but true)
           setTimeout(() => {
                setFilms(mapFilmData(data))
                setIsLoading(false)
           }, 1000)
        }
        getFilms()
    }, [])

    return {films, isLoading}
}

export default useFilmData