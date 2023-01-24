import { MOVIES_URL } from '../../utils/constants';

class MoviesApi {
    constructor(moviesUrl){
        this._url = moviesUrl;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getMovies = async () => {
        const res = await fetch(`${this._url}`, {});
        return this._checkResponse(res);
    }
}

export const moviesApi = new MoviesApi(MOVIES_URL);
