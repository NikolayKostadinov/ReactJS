import logo from './logo.svg';
import Footer from './Footer';
import Hello from './Hello';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name="Niki" greeting="Hi" logo={logo}/>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
