import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function StarshipList() {
    const [starships, setStarships] = useState([]);

    useEffect(() => {
        fetch(`https://swapi.dev/api/starships`)
            .then(res => res.json())
            .then(data => setStarships(data.results));
    }, []);

    return (
        <div>
        <h2>Starship List</h2>
        <ul>
            {starships.map((ss) =>{
                let id = ss.url.split('/').filter(x=>x!=='').pop();
                return(<li key={id}>
                    <Link to={`/starships/${id}`}>{ss.name}</Link>
                </li>);
                }
            )}
        </ul>
        </div>
    );
}