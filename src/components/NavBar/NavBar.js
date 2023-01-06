import bugerIcon from '../../images/burger.svg';
import accountButtonIcon from '../../images/account-button-icon.svg';

export default function NavBar(props) {
    const {} = props;
    return (
        <>
            <div className="nav-bar">
                <button className='close-button'></button>
                <ul className="nav-bar-menu">
                    <li className="nav-bar-menu__item">Главная</li>
                    <li className="nav-bar-menu__item">Фильмы</li>
                    <li className="nav-bar-menu__item">Сохранённые фильмы</li>
                </ul>
                <button className="button account-button" type="button">Аккаунт<img src={accountButtonIcon} className="account-button__icon" alt="account-icon"/></button>
            </div>
        </>
    );
  }