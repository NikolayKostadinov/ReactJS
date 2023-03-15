import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';


import Catalog from './components/catalog/Catalog';
import CreateGame from './components/create-game/CreateGame';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Details from './components/details/Details';
import './App.css';
import Logout from './components/logout/Logout';
import EditGame from './components/edit-game/EditGame';
import Delete from './components/delete/Delete';
import AuthenticatedGuard from './components/common/AuthenticatedGuard';
import OwnerGuard from './components/common/OwnerGuard';

// Component lazy loading
const Register = lazy(() => import('./components/register/Register'))

function App() {

    return (
        <AuthProvider>
            <GameProvider>
                <div className="App">
                    <div id="box">
                        <Header />
                        <main id="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Suspense fallback={<span>Loading...</span>}>
                                    <Register />
                                </Suspense>} />
                                <Route element={<AuthenticatedGuard />}>
                                    <Route path="/logout" element={<Logout />} />
                                    <Route path="/create" element={<CreateGame />} />
                                    <Route element={<OwnerGuard />}>
                                        <Route path="/edit/:gameId" element={<EditGame />} />
                                        <Route path="/delete/:gameId" element={<Delete />} />
                                    </Route>
                                </Route>
                                <Route path="/catalog" element={<Catalog />} />
                                <Route path="/catalog/:gameId" element={<Details />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </GameProvider>
        </AuthProvider>
    );
}

export default App;
