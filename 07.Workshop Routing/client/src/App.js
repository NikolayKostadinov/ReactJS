import { Route, Routes } from 'react-router-dom';
import './App.css';
import Catalog from './components/catalog/Catalog';
import CreateGame from './components/create-game/CreateGame';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/login';
import Register from './components/register/Register';

function App() {
  return (
    <div className="App">
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regirter" element={<Register />} />
            <Route path="/create" element={<CreateGame />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
