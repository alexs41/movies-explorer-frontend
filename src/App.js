import './index.css';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <div className="root">
        <Header />
        {/*<Main /> */}
        <Movies />
        <Footer />
        {/* <Register /> */}
        {/* <Login /> */}
        {/* <NavBar /> */}
        
      </div>
    </div>
  );
}

export default App;
