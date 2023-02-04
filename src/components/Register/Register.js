import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {

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
            const { email, password, name } = user;
            if (!email || !password || !name) return;
            await onRegister(email, password, name);
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
                        <h3 className="login-form__header">Добро пожаловать!</h3>

                        <div className='login-form-input-container'>
                            
                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>Имя</p>
                                <input id="name-input" type="text" name="name" className="login-form-input__input" required minLength="2" maxLength="40" value={user.name} onChange={handleChange} />
                            </div>

                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>E-mail</p>
                                <input id="email-input" type="email" name="email" className="login-form-input__input" required minLength="2" maxLength="40" value={user.email} onChange={handleChange}/>
                            </div>

                            <div className='login-form-input'>
                                <p className='login-form-input__placeholder'>Пароль</p>
                                <input id="name-input" type="password" name="password" className="login-form-input__input" required minLength="2" maxLength="40" value={user.password} onChange={handleChange} />
                            </div>

                            <div className="profile-form-down-part__span profile-form-down-part__span_register"><span className="profile-form__input-error">При регистрации произошла ошибка.</span></div>
                        </div>
                        <div className="profile-form-down-part">
                            <button className="button profile-form__submit-button profile-form__submit-button_edit-profile" type="submit">Зарегистрироваться</button>
                            <p className="profile-form-down-part__сaption">Уже зарегистрированы? <Link className="link profile-form-down-part__link" to="/signin" style={{ textDecoration: 'none' }}>Войти</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
