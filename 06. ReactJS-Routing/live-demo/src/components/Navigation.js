import { NavLink } from "react-router-dom";
import styles from './Navigation.module.css';

export default function Navigation() {
    const setActive = ({isActive}) => isActive
            ? styles['active-link']
            : undefined;

    return (
        <ul>
            <li><NavLink  to="/" className={setActive}>Home</NavLink></li>
            <li><NavLink className={setActive} to="/about">About</NavLink></li>
            <li><NavLink className={setActive} to="/pricing">Pricing</NavLink></li>
            <li><NavLink className={setActive} to="/contacts">Contacts</NavLink></li>
            <li><NavLink className={setActive} to="/starships">StarshipList</NavLink></li>
            <li><NavLink className={setActive} to="/starships/2">Starships</NavLink></li>
            <li><NavLink className={setActive} to="/milenium-falkon">Milenium Falkon</NavLink></li>
        </ul>
    );
}
