import logo from './logo.svg';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Hello React!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Footer/>
      </header>
    </div>
  );
}

export default App;
