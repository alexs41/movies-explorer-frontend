export default function IsSavedButton({ handleClick, movie }) {
    return (
        <>
            <button className="button movies-card__saved-button" type="button" onClick={(e) => handleClick(e, movie)}></button>
        </>
    );
  }