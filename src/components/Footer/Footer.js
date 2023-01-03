export default function Footer(props) {
    const {} = props;
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <p className="description description_grey">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className="footer-container-caption">
                        <p className="description">© 2023</p>
                        <ul className="footer-container-links">
                            <li className="footer-container-links__link description"><a href="https://github.com/alexs41" className="link">Яндекс.Практикум</a></li>
                            <li className="footer-container-links__link description"><a href="https://github.com/alexs41" className="link">Github</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
  }