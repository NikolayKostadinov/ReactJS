import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

import * as gameService from './services/gameService';
import { AuthContext } from './contexts/AuthContext';

import Catalog from './components/catalog/Catalog';
import CreateGame from './components/create-game/CreateGame';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Details from './components/details/Details';
import './App.css';
import Logout from './components/logout/Logout';
import useSessionPersister from './hooks/useSessionPersister';
import { GameContext } from './contexts/GameComtext';

// Component lazy loading
const Register = lazy(() => import('./components/register/Register'))

function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useSessionPersister({});

    const userLogin = (authData) => {
        setAuth(authData);
    }

    const userLogout = () => {
        setAuth({});
    }

    const addComment = (gameId, comment) => {
        setGames(state => state
            .map(x => x._id === gameId
                ? { ...x, comments: [...(x.comments || []), comment] }
                : x));

        console.log(games);
    }

    const addGame = (game) => {
        setGames(games => [...games, game]);
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
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <GameContext.Provider value={{ games, addGame }}>
                <div className="App">
                    <div id="box">
                        <Header />
                        <main id="main-content">
                            <Routes>
                                <Route path="/" element={<Home games={games} />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/register" element={<Suspense fallback={<span>Loading...</span>}>
                                    <Register />
                                </Suspense>} />
                                <Route path="/create" element={<CreateGame addGame={addGame} />} />
                                <Route path="/catalog" element={<Catalog games={games} />} />
                                <Route path="/catalog/:gameId" element={<Details games={games} addComment={addComment} />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </GameContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
