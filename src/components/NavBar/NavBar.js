import bugerIcon from '../../images/burger.svg';
import accountButtonIcon from '../../images/account-button-icon.svg';

export default function NavBar(props) {
    const {} = props;
    return (
        <>
            <div className="popup popup_opened">
                <div className="nav-bar">
                    <button className="button close-button"></button>
                    <ul className="nav-bar-menu">
                        <li className="nav-bar-menu__item"><a href='#' className='link'>Главная</a></li>
                        <li className="nav-bar-menu__item nav-bar-menu__item_underline"><a href='#' className='link'>Фильмы</a></li>
                        <li className="nav-bar-menu__item"><a href='#' className='link'>Сохранённые фильмы</a></li>
                    </ul>
                    <button className="button account-button" type="button">Аккаунт<img src={accountButtonIcon} className="account-button__icon" alt="account-icon"/></button>
                </div>
            </div>
            
        </>
    );
  }