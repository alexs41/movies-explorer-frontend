import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { moviesApi } from "../MoviesApi/MoviesApi";
import React, { useState, useEffect } from 'react';
import { transformMovies as transformMovies } from '../../utils/utils'

export default function Movies({ onSaveDeleteClick }) {
    const [moviesArray, setMoviesArray] = useState([]);
    const [preloaderIsOpen, setPreloaderIsOpen] = useState(false);

    async function renderInitialMovies() {
        try {
            setPreloaderIsOpen(true);
            let initialMovies = [];
            initialMovies = await moviesApi.getMovies();
            initialMovies = transformMovies(initialMovies);
            setMoviesArray(initialMovies);
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        } finally {
            setPreloaderIsOpen(false);
        }
    }
    useEffect(() => {
        renderInitialMovies();
    }, []);

    return (
        <>  
            <Header/>
            <SearchForm children={<FilterCheckbox/>} handleSubmit={renderInitialMovies} />
            <Preloader isOpen={preloaderIsOpen} />
            <MoviesCardList moviesArray={moviesArray} onSaveDeleteClick={onSaveDeleteClick} />
            <Footer/>
        </>
    );
  }