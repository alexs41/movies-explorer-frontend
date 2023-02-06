import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { moviesApi } from "../MoviesApi/MoviesApi";
import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';

import { transformMovies as transformMovies, filterMovies as filterMovies, filterShortMovies as filterShortMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies({ onSaveDeleteClick, savedMoviesArray }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const isFirstRun = useRef(true);
    
    const [serverMovies, setServerMovies] = useState([]); // все фильмы от сервера, для единоразового обращения к нему
    const [searchedMovies, setSearchedMovies] = useState([]); // фильмы полученные с запроса
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы

    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);
    const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false); // состояние чекбокса
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы


    // поиск по массиву и установка состояния
    function handleSetFilteredMovies(allMovies, userQuery, shortMoviesCheckbox) {
        const moviesList = filterMovies(allMovies, userQuery, shortMoviesCheckbox);

        if (moviesList.length === 0) {
            alert('Ничего не найдено.');
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setSearchedMovies(moviesList);
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
        const { name, value } = e.target[0];
        await setCurrentUser({
            ...currentUser,
            [name]: value
        });
        localStorage.setItem(`${currentUser.email} - movieSearch`, e.target.value);
        localStorage.setItem(`${currentUser.email} - shortMovies`, shortMoviesCheckbox);

        if (serverMovies.length === 0) {
            setPreloaderIsOpen(true);
            try {
                setServerMovies(transformMovies(await moviesApi.getMovies()));
                    // handleSetFilteredMovies(
                    //     // transformMovies(serverMovies),
                    //     serverMovies,
                    //     currentUser.search,
                    //     shortMoviesCheckbox
                    // ); 
            } catch {
                alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
            } finally {
                setPreloaderIsOpen(false);
            }
        } 
        else {
            handleSetFilteredMovies(serverMovies, currentUser.search, shortMoviesCheckbox);
        }
    }

    useEffect (() => {
        if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
        }
        handleSetFilteredMovies(serverMovies, currentUser.search, shortMoviesCheckbox);
    }, [serverMovies]);

    // состояние чекбокса
    function handleShortMovies() {
        setShortMoviesCheckbox(!shortMoviesCheckbox);
        if (!shortMoviesCheckbox) {
            setFilteredMovies(filterShortMovies(searchedMovies));
        } else {
            setFilteredMovies(searchedMovies);
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
    }, []);

    // рендер фильмов из локального хранилища
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - movies`)) {
            const movies = JSON.parse(
                localStorage.getItem(`${currentUser.email} - movies`)
            );
            setSearchedMovies(movies);
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
    //         setServerMovies(initialMovies);
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