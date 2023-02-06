import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import React, { useState, useEffect, useContext } from 'react';
import { filterMovies as filterMovies, filterShortMovies as filterShortMovies } from '../../../utils/utils';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { mainApi } from "../../MainApi/MainApi";

export default function SavedMovies({ onSaveDeleteClick, savedMoviesArray, setSavedMoviesArray }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);
    const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false); // состояние чекбокса
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы

    const [showedMovies, setShowedMovies] = useState(savedMoviesArray); // показываемывые фильмы

    // async function getSavedMovies() {
    //     try {
    //         setSavedMoviesArray(await mainApi.getSavedMovies());
    //     } catch (err) {
    //         console.log('при выполенении запроса произошла ошибка', err);
    //     }
    // }
    
    // проверка наличия сохраненных фильмов
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - savedMovies`) === 'true') {
            // setShortMoviesCheckbox(true);
            const savedMovies = JSON.parse(
                localStorage.getItem(`${currentUser.email} - savedMovies`)
            );
            setShowedMovies(savedMovies);
        } else {
            // getSavedMovies();
            setShowedMovies(savedMoviesArray);
        }
    }, []);

    // поиск по запросу
    function handleSearchSubmit(inputValue) {
        const moviesList = filterMovies(savedMoviesArray, inputValue, shortMoviesCheckbox);
        if (moviesList.length === 0) {
            setNotFound(true);
            alert('Ничего не найдено.');
        } else {
            setNotFound(false);
            setFilteredMovies(moviesList);
            setShowedMovies(moviesList);
        }
    }

    // состояние чекбокса
    function handleShortMovies() {
        if (!shortMoviesCheckbox) {
            setShortMoviesCheckbox(true);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
            setShowedMovies(filterShortMovies(filteredMovies));
            filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
        } else {
            setShortMoviesCheckbox(false);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
            filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
            setShowedMovies(filteredMovies);
        }
    }

    // проверка чекбокса в локальном хранилище
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
            setShortMoviesCheckbox(true);
            setShowedMovies(filterShortMovies(savedMoviesArray));
        } else {
            setShortMoviesCheckbox(false);
            setShowedMovies(savedMoviesArray);
        }
    }, [savedMoviesArray, currentUser]);

    useEffect(() => {
        setFilteredMovies(savedMoviesArray);
        savedMoviesArray.length !== 0 ? setNotFound(false) : setNotFound(true);
    }, [savedMoviesArray]);

    return (
        <>
            <Header />
            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleShortMovies={handleShortMovies}
                shortMoviesCheckbox={shortMoviesCheckbox}
            />
            <Preloader isOpen={preloaderIsOpen} />
            {!NotFound && (
                <MoviesCardList
                    moviesArray={showedMovies}
                    // savedMoviesArray={savedMoviesArray}
                    onSaveDeleteClick={onSaveDeleteClick}
                    isSaved={true}
                />
            )}
            <Footer />
        </>
    );
}