import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
    const { } = props;
    return (
        <>
            <div className="card-list">
                <div className="card-list-container">
                    <div className="card-list-grid">
                        <MoviesCard />
                        <MoviesCard />
                        <MoviesCard />
                        <MoviesCard />
                        <MoviesCard />
                    </div>
                    <div className="card-list-more">
                        <button className="button card-list-more__more-button">Ещё</button>
                    </div>
                </div>
            </div>
            
        </>
    );
  }