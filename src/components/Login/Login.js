import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Login ({ onLogin }) {

    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
      });
    // Обработчик изменения инпута обновляет стейт
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
          ...user,
          [name]: value 
        });
      };

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const { email, password } = user;
            if (!email || !password) return;
            await onLogin(email, password);
        } catch (err) {
            console.log(`Ошибка! ${err}`);
            // выведем ошибку в консоль
        }
    }
    return (
        <>
            <div className="login">
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="header__logo"></div>
                        <h3 className="login-form__header">Рады видеть!</h3>

                        <div className='login-form-input-container'>
                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>E-mail</p>
                                <input id="email-input" type="email" name="email" className="login-form-input__input" required minLength="2" maxLength="40" value={user.email} onChange={handleChange}/>
                            </div>
                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>Пароль</p>
                                <input id="name-input" type="password" name="password" className="login-form-input__input" required minLength="2" maxLength="40" value={user.password} onChange={handleChange} />
                            </div>
                            <div className="login-form-input-container__input-error">При обновлении профиля произошла ошибка.</div>
                        </div>
                        
                        <div className="profile-form-down-part">
                            <button className="button profile-form__submit-button profile-form__submit-button_edit-profile" type="submit">Войти</button>
                            <p className="profile-form-down-part__сaption">Ещё не зарегистрированы? <Link className="link profile-form-down-part__link" to="/signup" style={{ textDecoration: 'none' }}>Регистрация</Link></p>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    );
}
