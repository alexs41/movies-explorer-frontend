import { SHORTMOVIES_DURATION } from './constants.js';
import movieDefaultImage from '../images/movie-default-image.jpeg';

// проверка изображений полученных от сервера
function transformMovies(movies) {
  movies.forEach(movie => {
    if (!movie.image) {
      movie.image = movieDefaultImage;
      movie.thumbnail = movieDefaultImage;
    } 
    else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }
    if(!movie.country) {
      movie.country = 'Russia';
    }
    if(!movie.nameEN) {
      movie.nameEN = movie.nameRU;
    }
  });
  return movies
}

// фильтрация по длительности
function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < SHORTMOVIES_DURATION);
}

// фильтрация по запросу
function filterMovies(movies, userQuery, shortMoviesCheckbox) {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesCheckbox) {
    return filterShortMovies(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

// преобразование длительности
function transformDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

// cравнение сохраненных фильмов
function getSavedMovieCard(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export {
  transformMovies,
  filterMovies,
  filterShortMovies,
  transformDuration,
  getSavedMovieCard,
};
