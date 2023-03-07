import { Route, Routes } from 'react-router-dom';
import './App.css';
import Catalog from './components/catalog/Catalog';
import CreateGame from './components/create-game/CreateGame';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/login';
import Register from './components/register/Register';
import { useState, useEffect } from 'react';
import * as gameService from './services/gameService';
import Details from './components/details/Details';

function App() {
  const [games, setGames] = useState([]);

  const addComment = (gameId, comment) => {
    setGames(state => state
      .map(x => x._id === gameId
        ? {...x, comments:[...(x.comments || []), comment]}
        : x));

    console.log(games);
  }

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
    <div className="App">
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home games={games} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regirter" element={<Register />} />
            <Route path="/create" element={<CreateGame />} />
            <Route path="/catalog" element={<Catalog games={games} />} />
            <Route path="/catalog/:gameId" element={<Details games={games} addComment={addComment} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
