import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Film(props) {
    const [film, setFilm] = useState({});
    const { filmId } = useParams();

    useEffect(() => {
        if (filmId) {
            fetch(`https://swapi.dev/api/films/${filmId}/`)
                .then(res => res.json())
                .then(data => setFilm(data));
        }
    }, [filmId])

    return (
        <div>
            <hgroup>
                <h3>{film.title}</h3>
                <h4>Episode: {film.episode_id}</h4>
            </hgroup>
            <pre>
                {film.opening_crawl}
            </pre>
        </div>
    );
}