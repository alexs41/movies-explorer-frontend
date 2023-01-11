import { Link, NavLink } from "react-router-dom";
import React, { useEffect } from 'react';

import accountButtonIcon from '../../images/account-button-icon.svg';

export default function NavBar(props) {
    const { isOpen, handleClickCloseButton } = props;

    

    function handleBlackAreaClosePopup(e) {
        if (e.target === e.currentTarget) { 
            handleClickCloseButton(); 
        };
    }

    useEffect(() => {
        function handleEscClose(e) {
            if (e.key === 'Escape') {
                handleClickCloseButton();
            }
        }
        if (isOpen === true) {
            document.addEventListener("keydown", handleEscClose);
        } else {
            document.removeEventListener("keydown", handleEscClose);
        }
    }, [handleClickCloseButton, isOpen]);

    return (
        <>
            <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleBlackAreaClosePopup}>
                <div className="nav-bar">
                    <button className="button close-button" onClick={handleClickCloseButton}></button>
                    <ul className="nav-bar-menu">
                        <li className="nav-bar-menu__item">
                            <NavLink className="link" to="/" style={({ isActive }) => isActive ? { borderBottom: '2px solid' } : undefined}>Главная</NavLink>
                        </li>
                        <li className="nav-bar-menu__item">
                            <NavLink className="link" to="/movies" style={({ isActive }) => isActive ? { borderBottom: '2px solid' } : undefined}>Фильмы</NavLink>
                        </li>
                        <li className="nav-bar-menu__item">
                            <NavLink className="link" to="/saved-movies" style={({ isActive }) => isActive ? { borderBottom: '2px solid' } : undefined}>Сохраненные фильмы</NavLink>
                        </li>
                    </ul>
                    <Link className="button account-button" to="/profile" style={{ textDecoration: 'none' }}>Аккаунт<img src={accountButtonIcon} className="account-button__icon" alt="account-icon" /></Link>
                </div>
            </div>
        </>
    );
}