import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';


export default function SearchForm({ handleSearchSubmit, handleShortMovies, shortMoviesCheckbox }) {
    const location = useLocation();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const [query, setQuery] = useState('');

    // Обработчик изменения инпута обновляет стейт
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({
            ...currentUser,
            [name]: value
        });
        // setQuery(e.target.value);
    };

    //состояние инпута из локального хранилища
    // useEffect(() => {
    //     if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
    //         const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
    //         setCurrentUser({
    //             ...currentUser,
    //             search: searchValue
    //         });
    //         // setQuery(searchValue);
    //     }
    // }, []);

    return (
        <>
            <section className="search-form">
                <div className="search-form-container">
                    <form className="form" name="search" onSubmit={handleSearchSubmit}>
                        <input id='search' className="form__input form__search"
                            name="search"
                            type="text"
                            placeholder="Фильм"
                            autoComplete="off"
                            onChange={handleChange}
                            value={currentUser.search || ''}
                            required
                        />
                        {console.log(currentUser.search)}
                        <span className="form__input-error"></span>
                        <button className="button form__submit-button" type="submit"></button>
                    </form>
                    <FilterCheckbox handleShortMovies={handleShortMovies} shortMoviesCheckbox={shortMoviesCheckbox} />
                </div>
            </section>
        </>
    );
}