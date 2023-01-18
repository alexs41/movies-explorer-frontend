class MoviesApi {
    constructor(config){
        this._url = config.url;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getMovies = () => {
        return fetch(`${this._url}`, {
        })
        .then(this._checkResponse);
    }
}
const apiConfig = {
    url: "https://api.nomoreparties.co/beatfilm-movies",
  }

export const moviesApi = new MoviesApi(apiConfig);
