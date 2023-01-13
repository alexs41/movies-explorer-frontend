import { BrowserRouter, Route, Routes, Redirect, Link } from "react-router-dom";

// import ProtectedRoute from './ProtectedRoute';
import './index.css';
import './App.css';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Profile from "./components/Profile/Profile";
import Page404 from "./components/Page404/Page404";


function App() {
  

  return (
    <div className="App">
      <div className="root">
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<Movies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
