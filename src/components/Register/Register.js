import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Register(props) {
    let { } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    // React.useEffect(() => {
    //     if (isOpen) {
    //         setName(currentUser.name);
    //         setDescription(currentUser.about);
    //     }
    // }, [currentUser, isOpen]);

    // Обработчик изменения инпута обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    return (
        <>
            <div className="login">
                <div className="login-container">
                    <div className="login-form">
                        <div className="header__logo"></div>
                        <h3 className="login-form__header">Добро пожаловать!</h3>

                        <div className='login-form-input-container'>
                            
                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>Имя</p>
                                <input id="name-input" type="text" name="name" className="login-form-input__input" required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
                            </div>

                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>E-mail</p>
                                <input id="email-input" type="text" name="email" className="login-form-input__input" required minLength="2" maxLength="40" value={email} onChange={handleChangeEmail}/>
                            </div>

                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>Пароль</p>
                                <input id="name-input" type="text" name="name" className="login-form-input__input" required minLength="2" maxLength="40" value={password} onChange={handleChangePassword} />
                            </div>

                            <div className="profile-form-down-part__span profile-form-down-part__span_register"><span className="profile-form__input-error">При обновлении профиля произошла ошибка.</span></div>
                        </div>
                        <div className="profile-form-down-part">
                            <button className="button profile-form__submit-button profile-form__submit-button_edit-profile" type="submit">Зарегистрироваться</button>
                            <p className="profile-form-down-part__сaption">Уже зарегистрированы? <Link className="link profile-form-down-part__link" to="/signin" style={{ textDecoration: 'none' }}>Войти</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
