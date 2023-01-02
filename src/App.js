import './index.css';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="App">
      <div className="root">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
