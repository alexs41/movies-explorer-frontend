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

    async function renderInitialMovies() {
        try {
            let initialMovies = [];
            initialMovies = await moviesApi.getMovies();
            initialMovies = transformMovies(initialMovies);
            setMoviesArray(initialMovies);
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    }
    useEffect(() => {
        renderInitialMovies();
        
    }, []);

    return (
        <>  
            <Header/>
            <SearchForm children={<FilterCheckbox/>} handleSubmit={renderInitialMovies} />
            {/* <Preloader /> */}
            <MoviesCardList moviesArray={moviesArray} onSaveDeleteClick={onSaveDeleteClick} />
            <Footer/>
        </>
    );
  }