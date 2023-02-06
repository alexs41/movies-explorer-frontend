import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from 'react';
import { DEVICE_PARAMS } from '../../../utils/constants';
import useScreenWidth from '../../../hooks/useScreenWidth';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ moviesArray, savedMoviesArray, onSaveDeleteClick, saveDeleteButton, isSaved }) {
    const screenWidth = useScreenWidth();
    const { desktop, tablet, mobile } = DEVICE_PARAMS;
    const location = useLocation();
    const [isMount, setIsMount] = useState(true);
    const [showMoviesArray, setShowMoviesArray] = useState([]);
    const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, more: 3 });

    // количество отображаемых карточек при разной ширине экрана
    useEffect(() => {
        if (location.pathname === '/movies') {
            if (screenWidth > desktop.width) {
                setCardsShowDetails(desktop.cards);
            } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
                setCardsShowDetails(tablet.cards);
            } else {
                setCardsShowDetails(mobile.cards);
            }
            return () => setIsMount(false);
        }
    }, [screenWidth, isMount, desktop, tablet, mobile, location.pathname]);

    // изменяем отображаемый массив фильмов в зависимости от ширины экрана
    useEffect(() => {
        if (moviesArray.length) {
            const res = moviesArray.filter((item, i) => i < cardsShowDetails.total);
            setShowMoviesArray(res);
        }
    }, [moviesArray, cardsShowDetails.total]);

    // добавление карточек при клике по кнопке "Еще"
    function handleClickMoreMovies() {
        const start = showMoviesArray.length;
        const end = start + cardsShowDetails.more;
        const additional = moviesArray.length - start;
        if (additional > 0) {
            const newCards = moviesArray.slice(start, end);
            setShowMoviesArray([...showMoviesArray, ...newCards]);
        }
    }

    return (
        <>
            <div className="card-list">
                <div className="card-list-container">
                    {showMoviesArray ? (
                        <div className="card-list-grid">
                            {showMoviesArray.map(movie => {
                                return <MoviesCard key={movie.id || movie.movieId} movie={movie} onSaveDeleteClick={onSaveDeleteClick} saveDeleteButton={saveDeleteButton} isSaved={isSaved} />;
                            }
                            )}
                        </div>
                    ) : null}
                    {location.pathname === '/movies' && showMoviesArray.length >= 5 && showMoviesArray.length < moviesArray.length && (
                        <div className="card-list-more">
                            <button className="button card-list-more__more-button" onClick={handleClickMoreMovies}>Ещё</button>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}