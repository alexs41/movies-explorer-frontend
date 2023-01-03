import './index.css';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <div className="root">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
