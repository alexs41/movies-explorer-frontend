class MainApi {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
        this._token = '';
    }

    _request = async ({
        url,
        method = 'POST',
        token,
        data
      }) => {
        const res = await fetch(`${this._url}${url}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...!!token && { 'Authorization': `Bearer ${token}` }
          },
          ...!!data && { body: JSON.stringify(data) }
        });
        if (!res.ok)
          return Promise.reject(res.status);
        return await res.json();
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser = () => {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    editUser = (user) => {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                email: user.email,
            })
        })
        .then(this._checkResponse);
    }
    getSavedMovies = () => {
        return fetch(`${this._url}/movies`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }
    addMovie = (movie) => {
        return fetch(`${this._url}/movies`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: movie.image,
                    trailerLink: movie.trailerLink,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN,
                    thumbnail: movie.thumbnail,
                    movieId: movie.id
                })
            })
            .then(this._checkResponse);
    }
    deleteMovie = (movie) => {
        return fetch(`${this._url}/movies/${movie.data._id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse);
    }
//--------------------------------------------
    authorize = (email, password) => {
        return this._request({
          url: '/signin',
          data: {email, password}
        });
      };
    
    register = (email, password, name) => {
        return this._request({
            url: '/signup',
            data: {email, password, name}
        });
    };

    setToken = (token) => {
        this._headers = {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    }

}
const apiConfig = {
    url: "https://backend.diploma-alexs41.nomoredomains.club",
    headers: {
      "content-type": "application/json"
    }
  }

export const mainApi = new MainApi(apiConfig);
