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
import { useNavigate } from 'react-router-dom';
import { mainApi } from "./components/MainApi/MainApi";

function App() {
  let navigate = useNavigate();
  const successText = 'Вы успешно зарегистрировались!';
  const failText = 'Что-то пошло не так! Попробуйте ещё раз.';

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogin = async (password, email) => {
      try {
          const data = await mainApi.authorize(password, email);
          if (!data.token) throw new Error('Missing token');
          localStorage.setItem('token', data.token);
          checkToken();
      } catch (err) {
          console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
      }
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/signin');
  }

  const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) ;
      try {
          mainApi.setToken(token);
          const data = await mainApi.getUser();
          setLoggedIn(true);
          setCurrentUser(data);
          navigate('/');
      } catch (err) {
          console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
      }
  };

  async function handleRegister (email, password, name) {
    try {
        const data = await mainApi.register(email, password, name);
        navigate('/movies');
        if (data.data._id) {
            // setRegisterPopup({
            //     iconPath: successIcon,
            //     infoText: successText
            // });
            alert("Вы успешно зарегистрированы");
        } else {
            // setRegisterPopup({
            //     iconPath: failIcon,
            //     infoText: failText
            // });
            alert("Во время регистрации произошла ошибка");
        }
    } catch (err) {
        // setRegisterPopup({
        //     iconPath: failIcon,
        //     infoText: failText
        // });
        alert(`Ошибка! ${err}`);
        console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        return err;
    } finally {
        // infoTooltipOpen();
    }
};
  return (
    <div className="App">
      <div className="root">
        {/* <BrowserRouter> */}
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
            <Route path="/signup" element={<Register onRegister={handleRegister}/>} />
            <Route path="/" element={<Main />} />

            
              <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
            

            

            <Route path="/saved-movies" element={<Movies />} />
              <Route path="/profile" element={<Profile />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        {/* </BrowserRouter> */}
      </div>
    </div>
  );
}

export default App;
