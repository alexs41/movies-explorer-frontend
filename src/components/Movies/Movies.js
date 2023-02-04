import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { moviesApi } from "../MoviesApi/MoviesApi";
import React, { useState, useEffect, useContext } from 'react';
import { transformMovies as transformMovies, filterMovies as filterMovies, filterShortMovies as filterShortMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies({ onSaveDeleteClick, savedMoviesArray, setSavedMoviesArray }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);
    const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false); // состояние чекбокса
    const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
    const [serverMovies, setServerMovies] = useState([]); // все фильмы от сервера, для единоразового обращения к нему

    // поиск по массиву и установка состояния
    function handleSetFilteredMovies(allMovies, userQuery, shortMoviesCheckbox) {
        const moviesList = filterMovies(allMovies, userQuery, shortMoviesCheckbox);
        debugger;
        if (moviesList.length === 0) {
            alert('Ничего не найдено.');
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setInitialMovies(moviesList);
        setFilteredMovies(
            shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
        );
        localStorage.setItem(
            `${currentUser.email} - movies`,
            JSON.stringify(moviesList)
        );
    }

    // поиск по запросу
    async function handleSearchSubmit(e) {
        e.preventDefault();
        debugger;
        localStorage.setItem(`${currentUser.email} - movieSearch`, currentUser.search);
        localStorage.setItem(`${currentUser.email} - shortMovies`, shortMoviesCheckbox);

        if (serverMovies.length === 0) {
            setPreloaderIsOpen(true);
            try {
                setServerMovies(await moviesApi.getMovies());
                debugger;
                handleSetFilteredMovies(
                    transformMovies(serverMovies),
                    currentUser.search,
                    shortMoviesCheckbox
                );
            } catch {
                alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
            } finally {
                setPreloaderIsOpen(false);
                debugger;
            }
        } else {
            handleSetFilteredMovies(serverMovies, currentUser.search, shortMoviesCheckbox);
        }
    }

    // состояние чекбокса
    function handleShortMovies() {
        setShortMoviesCheckbox(!shortMoviesCheckbox);
        if (!shortMoviesCheckbox) {
            setFilteredMovies(filterShortMovies(initialMovies));
        } else {
            setFilteredMovies(initialMovies);
        }
        localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMoviesCheckbox);
    }
    // проверка чекбокса в локальном хранилище
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
            setShortMoviesCheckbox(true);
        } else {
            setShortMoviesCheckbox(false);
        }
    }, [currentUser]);

    // рендер фильмов из локального хранилища
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - movies`)) {
            const movies = JSON.parse(
                localStorage.getItem(`${currentUser.email} - movies`)
            );
            setInitialMovies(movies);
            if (
                localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
            ) {
                setFilteredMovies(filterShortMovies(movies));
            } else {
                setFilteredMovies(movies);
            }
        }
    }, [currentUser]);

    // async function renderInitialMovies() {
    //     try {
    //         setPreloaderIsOpen(true);
    //         let initialMovies = [];
    //         initialMovies = await moviesApi.getMovies();
    //         initialMovies = transformMovies(initialMovies);
    //         setMoviesArray(initialMovies);
    //     } catch (err) {
    //         console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
    //     } finally {
    //         setPreloaderIsOpen(false);
    //     }
    // }
    // useEffect(() => {
    //     renderInitialMovies();
    // }, []);

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
                <MoviesCardList moviesArray={filteredMovies} savedMoviesArray={savedMoviesArray} onSaveDeleteClick={onSaveDeleteClick} />
            )}
            <Footer />
        </>
    );
}