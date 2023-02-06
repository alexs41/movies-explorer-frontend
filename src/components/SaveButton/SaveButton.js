export default function SaveButton({ handleClick, movie }) {
    return (
        <>
            <button className="button movies-card__save-button" type="button" onClick={(e) => handleClick(e, movie)}>Сохранить</button>
        </>
    );
  }