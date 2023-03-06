import { useState, useEffect } from 'react';
import * as gameService from '../../services/gameService';
import LatestGame from '../header/latest-game/LatestGame';
const Home = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    gameService.getAll()
      .then(data => {
        Object.values(data)
          .forEach(game =>
            setGames(games => [...games, game])
          );
      });
  }, []);
  return (
    <section id="welcome-world">
      <div className="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
      </div>
      <img src="./images/four_slider_img01.png" alt="hero" />
      <div id="home-page">
        <h1>Latest Games</h1>
        {/* Display div: with information about every game (if any) */}
        {
          games.length === 0
            ? <p className="no-articles">No games yet</p>
            : games.map(game => <LatestGame key={game._id} game={game} />)
        }
      </div>
    </section>
  );
}
export default Home;