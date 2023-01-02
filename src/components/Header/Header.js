export default function Header(props) {
    const {} = props;
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header__logo"></div>
                    <div className="header-right-side">
                        <button className="button header-right-side__register-button" type="button">Регистрация</button>
                        <button className="button header-right-side__login-button" type="button">Войти</button>
                    </div>
                </div>
            </header>
        </>
    );
  }