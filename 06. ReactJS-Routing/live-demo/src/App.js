import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Pricing from './components/Pricing';
import Contacts from './components/Contacts';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import Starships from './components/Starships';
import StarshipList from './components/StarshipList';


function App() {
  return (
    <div className="App">
      <h1>Hello React Router</h1>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/pricing' element={<Pricing/>} />
        <Route path='/contacts' element={<Contacts/>} />
        <Route path='/starships' element={<StarshipList/>} />
        <Route path='/starships/:starshipId/*' element={<Starships/>} />
        <Route path='/milenium-falkon' element={<Navigate to="/starships/10" replace/>} />
        <Route path='/not-found' element={<NotFound/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
