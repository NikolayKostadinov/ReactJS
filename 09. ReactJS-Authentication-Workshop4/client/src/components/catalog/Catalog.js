import { useContext } from 'react';
import CatalogItem from "./CatalogItem";
import { GameContext } from '../../contexts/GameComtext';


const Catalog = () => {
    const { games } = useContext(GameContext);
    return (
        <section id="catalog-page" >
            <h1>All Games</h1>
            {
                games.length > 0
                    ? games.map(game => <CatalogItem key={game._id} game={game} />)
                    : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
}
export default Catalog;