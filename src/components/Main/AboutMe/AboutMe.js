import avatar from '../../../images/my-photo.jpg';
import arrow from '../../../images/arrow.svg';

export default function AboutMe(props) {
    const { } = props;
    return (
        <>
            <section className="about-me">
                <div className="about-me-container">
                    <h2 className="section-header">Студент</h2>
                    <div className="about-me-container-columns">
                        <div className="about-me-container-column">
                            <h3 className="main-section-header main-section-header_left">Виталий</h3>
                            <h4 className="about-me-container-column__subheader">Фронтенд-разработчик, 30 лет</h4>
                            <p className="description description_left about-me-container-column__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                            <div className="about-me-container-column__link">
                                <a href="https://github.com/alexs41" className="link">Github https://github.com/alexs41</a>
                            </div>
                        </div>
                        <img src={avatar} className="about-me-container-columns__image" alt="avatar"/>
                    </div>
                    <div className="portfolio">
                        <h4 className="portfolio__header">Портфолио</h4>
                        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                            <li className="portfolio__item"><a href="https://github.com/alexs41" className="link">Статичный сайт</a></li>
                            <li className="portfolio__item"><a href="https://github.com/alexs41" className="link">Адаптивный сайт</a></li>
                            <li className="portfolio__item"><a href="https://github.com/alexs41" className="link">Одностраничное приложение</a></li>
                        </ul>
                    </div>
                    
                </div>
            </section>
        </>
    );
}