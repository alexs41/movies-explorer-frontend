export default function Footer(props) {
    const {} = props;
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <p className="description description_grey footer-container__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className="footer-container-caption">
                        <p className="description footer-container-caption__copyright">© 2023</p>
                        <ul className="footer-container-links">
                            <li className="footer-container-links__link description"><a href="https://practicum.yandex.ru/" className="link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                            <li className="footer-container-links__link description"><a href="https://github.com/" className="link" target="_blank" rel="noreferrer">Github</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
  }