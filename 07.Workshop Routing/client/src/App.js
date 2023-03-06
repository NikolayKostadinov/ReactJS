import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';


function App() {
  return (
    <div className="App">
      <div id="box">
        <Header />
        {/* Main Content */}
        <main id="main-content">
          <Home />
        </main>
      </div>
    </div>
  );
}

export default App;
