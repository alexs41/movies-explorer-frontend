import { BrowserRouter, Route, Routes, Redirect, Link } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import './index.css';
import './App.css';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Profile from "./components/Profile/Profile";
import Page404 from "./components/Page404/Page404";
import { moviesApi } from "./components/MoviesApi/MoviesApi";
import { CurrentUserContext } from './contexts/CurrentUserContext';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mainApi } from "./components/MainApi/MainApi";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = React.useContext(CurrentUserContext); 

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogin = async (email, password) => {
      try {
          const data = await mainApi.authorize(email, password);
          if (!data.token) throw new Error('Missing token');
          localStorage.setItem('token', data.token);
          await checkToken();
          navigate('/movies');
      } catch (err) {
          console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
      }
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/');
  }

  const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {setLoggedIn(false)};
      try {
          mainApi.setToken(token);
          const data = await mainApi.getUser();
          setLoggedIn(true);
          setCurrentUser(data);
      } catch (err) {
          console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
      }
  };

  async function handleRegister (email, password, name) {
    try {
        const data = await mainApi.register(email, password, name);
        
        if (data.data._id) {
            setCurrentUser(data.data);
            alert("Вы успешно зарегистрированы");

            navigate('/movies');
        } else {
            alert("Во время регистрации произошла ошибка");
        }
    } catch (err) {
        alert(`Ошибка! ${err}`);
        console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        return err;
    } finally {
        // infoTooltipOpen();
    }
};
  // cохранение фильма
  function handleSaveMovie(e, movie) {
    mainApi
      .addMovie(movie)
      .then(newMovie => {
        setSavedMoviesList([newMovie, ...savedMoviesList]);
        if (e.target.classList.contains('movies-card__save-button')) {
          e.target.classList.add('movies-card__saved-button');
          e.target.classList.remove('movies-card__save-button');
          e.target.classList.textContent('');
        }
      })
      .catch(err => {
        alert(`Ошибка! ${err}`);
        console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        return err;
      });
  }
  // удаление фильма
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find((item) => item.movieId === movie.id || item.movieId === movie.movieId );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch(err => {
        alert(`Ошибка! ${err}`);
        console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        return err;
      });
  }
  return (
    <div className="App">
      <div className="root">
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
            <Route path="/signup" element={<Register onRegister={handleRegister}/>} />
            <Route path="/" element={<Main />} />
            
            <Route path="/movies" element={<PrivateRoute loggedIn={loggedIn}><Movies onSaveClick={handleSaveMovie} onDeleteClick={handleDeleteMovie} /></PrivateRoute>} />
            <Route path="/saved-movies" element={<PrivateRoute loggedIn={loggedIn}><Movies /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute loggedIn={loggedIn}><Profile onLogout={handleLogout}/></PrivateRoute>} />

            <Route path='*' element={<Page404 />} />
          </Routes>
          </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
