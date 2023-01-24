import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ moviesArray, onSaveClick, onDeleteClick }) {
    return (
        <>
            <div className="card-list">
                <div className="card-list-container">
                    { moviesArray ? (
                        <div className="card-list-grid">
                            {moviesArray.map(movie => {
                                return <MoviesCard key={movie.id} movie={movie} onSaveClick={onSaveClick} onDeleteClick={onDeleteClick} />;
                            }
                            )}
                        </div>
                    ) : null}
                    <div className="card-list-more">
                        <button className="button card-list-more__more-button">Ещё</button>
                    </div>
                </div>
            </div>
            
        </>
    );
  }