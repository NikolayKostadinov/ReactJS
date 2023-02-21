import './App.css';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Description from './components/Description';
import Speakers from './components/speakers/Speakers';
import Tickets from './components/Tickets';
import Schedule from './components/Schedule';
import Footer from './components/Footer';


function App() {
  return (
    <div className='App'>
      <Navigation />
      <Header />
      <div className="container">
        <Description />
        <Speakers />
      </div>
      <Tickets />
      <Schedule />
      <Footer />
    </div>
  );
}

export default App;
