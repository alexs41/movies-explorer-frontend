import React, { useState } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({ onLogout }) {
    const [isEditable, setIsEditable] = useState(false);

    const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    // React.useEffect(() => {
    //     if (isOpen) {
    //         setName(currentUser.name);
    //         setDescription(currentUser.about);
    //     }
    // }, [currentUser, isOpen]);

    function handleClickEditButton() {
        setIsEditable(true);
    }
    function handleClickSaveButton() {
        setIsEditable(false);
    }
    // Обработчик изменения инпута обновляет стейт
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({
            ...currentUser,
            [name]: value
        });
    };
    return (
        <>
            <Header />
            <div className="profile">
                <div className="profile-container">
                    <div className="profile-form">
                        <h3 className="profile-form__header">Привет, {currentUser.name}!</h3>
                        <div className='profile-form-input-container'>
                            <div className='profile-form-input'>
                                <p className='profile-form-input__placeholder'>Имя</p>
                                <input id="name-input" type="text" name="name" readOnly={isEditable ? false : true} className="form__input profile-form__input profile-form__input_name" placeholder="Имя" required minLength="2" maxLength="40" value={currentUser.name} onChange={handleChange} />
                            </div>
                            <div className='profile-form-input'>
                                <p className='profile-form-input__placeholder'>E-mail</p>
                                <input id="email-input" type="text" name="email" readOnly={isEditable ? false : true} className="form__input profile-form__input profile-form__input_email" placeholder="E-mail" required minLength="2" maxLength="40" value={currentUser.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="profile-form-down-part">
                            <div className="profile-form-down-part__span"><span className="profile-form__input-error">При обновлении профиля произошла ошибка.</span></div>
                            {isEditable ?
                                <button className="button profile-form__submit-button profile-form__submit-button_edit-profile" type="submit" onClick={handleClickSaveButton}>Сохранить</button>
                                : <>
                                    <button className="button profile-form__edit-button" type="submit" onClick={handleClickEditButton}>Редактировать</button>
                                    <button className="button profile-form__exit-button" type="button" onClick={onLogout}>Выйти из аккаунта</button>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
