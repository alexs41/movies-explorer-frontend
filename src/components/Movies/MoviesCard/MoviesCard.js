export default function MoviesCard({ movie, onSaveClick, onDeleteClick }) {
    return (
        <>
            <div className="movies-card">
                <div className="movies-card-image-container">
                    <img src={movie.thumbnail} alt={movie.nameEN} className="movies-card__image"/>
                </div>
                
                <h4 className="movies-card__header">{movie.nameRU}</h4>

                <p className="movies-card__duration">{ `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`} </p>
                <button className="button movies-card__save-button" type="button" onClick={(e) => onSaveClick(e, movie)}>Сохранить</button>
                {/* <button className="button movies-card__saved-button" type="button" onClick={onDeleteClick}></button> */}
            </div>
        </>
    );
  }