import './index.css';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <div className="root">
        <Header />
        {/*<Main /> */}
        <Movies />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
