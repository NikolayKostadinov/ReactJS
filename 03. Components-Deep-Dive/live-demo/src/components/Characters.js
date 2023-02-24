import { useState, useEffect } from "react";

export function CharacterList(props) {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/people')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCharacters(data.results);
            })
    }, []);

    return (
        <ul>
            {
                characters ?
                    characters.map(chr => <li key={chr.url}>{chr.name}</li>) :
                    <li>Loading</li>
            }
        </ul>
    );
}