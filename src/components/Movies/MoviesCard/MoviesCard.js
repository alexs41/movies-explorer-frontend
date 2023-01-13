export default function MoviesCard(props) {
    const { card } = props;
    const thumbnail = 'https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/e304da14-2f62-4342-9310-be50f82dd258/600x900';
    const nameEN = 'Humans';
    const nameRU = 'Gimme Danger: История Игги и The Stooges';
    const duration =  127;
    return (
        <>
            <div className="movies-card">
                <div className="movies-card-image-container">
                    <img src={thumbnail} alt={nameEN} className="movies-card__image"/>
                </div>
                
                <h4 className="movies-card__header">{nameRU}</h4>

                <p className="movies-card__duration">{ `${Math.floor(duration / 60)}ч ${duration % 60}м`} </p>
                {/* <button className="button movies-card__save-button">Сохранить</button> */}
                <button className="button movies-card__saved-button"></button>
            </div>
        </>
    );
  }