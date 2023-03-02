import { Link } from "react-router-dom";
export default function Navigation(props) {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
        </ul>
    );
}
