import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link, Route, Routes } from "react-router-dom";
import Film from "./Film";

export default function Starships() {
    const [starship, setStarship] = useState({});
    const { starshipId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);

    useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${starshipId}/`)
            .then(res => res.json())
            .then(data => setStarship(data))
            .catch(err=> navigate('/not-found'));
    }, [starshipId, navigate]);


    function onNextClickHandler(e) {
        navigate(`/products/${Number(starshipId) + 1}`)
    }

    return (
        <div>
            <hgroup>
                <h2>Starship Page</h2>
                <h3>Starship {starshipId} Specification</h3>
            </hgroup>
            {starship ? <ul>
                <li>Name: {starship.name}</li>
                <li>Model: {starship.model}</li>
                <li>Manufacturer: {starship.manufacturer}</li>
            </ul> :
                <h5>No Starshiп {starshipId} found!</h5>}

            <nav>
                <ul>
                    {starship.films?.map((x, ix) => {
                        let id = x.split('/').filter(p => p !== '').pop();
                        return (<li key={id}><Link to={`films/${id}`}>{`Film ${ix + 1}`}</Link></li>);
                    })}
                </ul>
            </nav>
            <section>
                <Routes>
                    <Route path={`films/:filmId`} element={<Film />}/>
                </Routes>
            </section>


            <button onClick={onNextClickHandler}>Next</button>
        </div>
    );
};


