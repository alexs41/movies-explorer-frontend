import accountButtonIcon from '../../images/account-button-icon.svg';
export default function Header(props) {
    const {} = props;
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header__logo"></div>
                    <div className="header-center-side">
                        <a href="#" className="link header-center-side__link">Фильмы</a>
                        <a href="#" className="link header-center-side__link">Сохраненные фильмы</a>
                    </div>
                    <div className="header-right-side">
                        {/* <button className="button header-right-side__register-button" type="button">Регистрация</button>
                        <button className="button header-right-side__login-button" type="button">Войти</button> */}
                        <button className="button account-button" type="button">Аккаунт<img src={accountButtonIcon} className="account-button__icon" alt="account-icon"/></button>
                    </div>
                </div>
            </header>
        </>
    );
  }