import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import accountButtonIcon from '../../images/account-button-icon.svg';

import bugerIcon from '../../images/burger.svg';
import NavBar from "../NavBar/NavBar";
export default function Header(props) {
    let navigate = useNavigate();
    let location = useLocation();

    function handleClickLogo() {
        navigate("/");
    }
    console.log(location.pathname);
    const [centerPart, setCenterPart] = useState('');
    const [rightPart, setRightPart] = useState('');

    function headerUpdate() {
        if (location.pathname === '/' || location.pathname === '') {
            // main
            setCenterPart('');
            setRightPart(
                <>
                    <div className="header-right-side">
                        <Link className="button header-right-side__register-button" to="/signup" style={{ textDecoration: 'none' }}>Регистрация</Link>
                        <Link className="button header-right-side__login-button" to="/signin" style={{ textDecoration: 'none' }}>Войти</Link>
                    </div>
                </>
            );
        } else if (location.pathname === '/movies' || location.pathname === '/movies/' || location.pathname === '/saved-movies' || location.pathname === '/saved-movies/' || location.pathname === '/profile' || location.pathname === '/profile/') {
            // movies, saved-movies, profile
            setCenterPart(
                <>
                    <div className="header-center-side">
                        <NavLink className="link header-center-side__link" to="/movies" style={({ isActive }) => isActive ? { fontWeight: '500' } : undefined}>Фильмы</NavLink>
                        <NavLink className="link header-center-side__link" to="/saved-movies" style={({ isActive }) => isActive ? { fontWeight: '500' } : undefined}>Сохраненные фильмы</NavLink>
                    </div>
                </>

            );
            setRightPart(
                <>
                    <button className="button account-button account-button_header" type="button" onClick={() => navigate("/profile")}>Аккаунт<img src={accountButtonIcon} className="account-button__icon" alt="account-icon" /></button>
                    <button className="button header-right-side__burger" type="button" onClick={handleClickBurger} style={{ backgroundImage: `url(${bugerIcon})` }}></button>
                </>
            );
        }
    }
    useEffect(() => {
        headerUpdate();
    }, [location.pathname]);

    const [navBarState, setNavBarState] = useState(false);
    const handleClickBurger = () => setNavBarState(true);
    function closeNavBar() {
        setNavBarState(false);
    }

    const { color } = props;
    return (
        <>
            <header className="header" style={{ backgroundColor: color }}>
                <div className="header-container">
                    <div className="header__logo" onClick={handleClickLogo}></div>
                    {centerPart}
                    {rightPart}
                </div>
            </header>
            <NavBar isOpen={navBarState} handleClickCloseButton={closeNavBar}/>
        </>
    );
}