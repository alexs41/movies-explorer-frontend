export default function SearchForm({children, handleSubmit}) {
    return (
        <>  
        <section className="search-form">
            <div className="search-form-container">
                <form className="form" onSubmit={handleSubmit}>
                    {/* onChange={} value={} */}
                    <input id='search' type="string" name='search' className="form__input form__search" placeholder="Фильм"  required minLength="2" maxLength="40" />
                    <span className="form__input-error"></span>
                    <button className="button form__submit-button" type="submit"></button>
                </form>
                {children}
            </div>
        </section>
    </>
    );
  }