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
import favicon from './images/logo.svg';
import faviconHidden from './images/vawing-hand.png';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // const userContext = React.useContext(CurrentUserContext);

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  const [savedMoviesArray, setSavedMoviesArray] = useState([]);

  // смена фавикона, когда пльзователь на другой вкладке
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [timerId, setTimerId] = useState('');

  useEffect(() => {
    const handleVisibilityChange = () => setIsPageHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (isPageHidden) {
      // Reset the favicon and title after 5 seconds
      setTimerId(setTimeout(() => {
        document.head.querySelector("[rel~=icon]").href = faviconHidden;
        document.title = "Вы еще тут?";
      }, 5000));
    } else {
      // Reset the favicon and title
      clearTimeout(timerId);
      setTimerId('');
      document.head.querySelector("[rel~=icon]").href = favicon;
      document.title = "React App";
    }
  }, [isPageHidden]);

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
  // регистрация
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
        setSavedMoviesArray([newMovie, ...savedMoviesArray]);
        if (e.target.classList.contains('movies-card__save-button')) {
          e.target.classList.add('movies-card__saved-button');
          e.target.classList.remove('movies-card__save-button');
          e.target.textContent='';
        }
      })
      .catch(err => {
        alert(`Ошибка! ${err}`);
        console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        return err;
      });
  }
  // удаление фильма
  function handleDeleteMovie(e, movie) {
    const savedMovie = savedMoviesArray.find((item) => item.movieId === movie.id || item.movieId === movie.movieId );
    mainApi
      .deleteMovie(savedMovie)
      .then(() => {
        const newMoviesArray = savedMoviesArray.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesArray(newMoviesArray);
        if (e.target.classList.contains('movies-card__saved-button')) {
          e.target.classList.add('movies-card__save-button');
          e.target.classList.remove('movies-card__saved-button');
          e.target.textContent='Сохранить';
        }
      })
      .catch(err => {
        alert(`Ошибка! ${err}`);
        console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        return err;
      });
  }
  function handleSaveDeleteClick(e, movie) {
    if (e.target.classList.contains('movies-card__save-button')) {
      handleSaveMovie(e, movie);
    } else if (e.target.classList.contains('movies-card__saved-button')) {
      handleDeleteMovie(e, movie);
    }
  }
  return (
    <div className="App">
      <div className="root">
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
            <Route path="/signup" element={<Register onRegister={handleRegister}/>} />
            <Route path="/" element={<Main />} />
            
            <Route path="/movies" element={<PrivateRoute loggedIn={loggedIn}><Movies onSaveDeleteClick={handleSaveDeleteClick} savedMoviesArray={savedMoviesArray} setSavedMoviesArray={setSavedMoviesArray} /></PrivateRoute>} />
            <Route path="/saved-movies" element={<PrivateRoute loggedIn={loggedIn}><Movies onSaveDeleteClick={handleSaveDeleteClick} savedMoviesArray={savedMoviesArray} setSavedMoviesArray={setSavedMoviesArray} /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute loggedIn={loggedIn}><Profile onLogout={handleLogout}/></PrivateRoute>} />

            <Route path='*' element={<Page404 />} />
          </Routes>
          </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
